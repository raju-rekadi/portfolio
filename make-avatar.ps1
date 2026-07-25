# Crops a square portrait out of a source photo and writes public/profile.jpg
#
#   .\make-avatar.ps1                      -> report dimensions only
#   .\make-avatar.ps1 -X 300 -Y 120 -Size 700
#
# The avatar is rendered inside a circle, so leave headroom: the subject's eyes
# should sit around 40% down the crop, with a little space above the hair.

param(
    [string]$In   = "D:\personal\portfolio\raw-photo.jpg",
    [string]$Out  = "D:\personal\portfolio\public\profile.jpg",
    [int]$X       = -1,
    [int]$Y       = -1,
    [int]$Size    = -1,
    [int]$Output  = 800
)

Add-Type -AssemblyName System.Drawing

if (-not (Test-Path $In)) { Write-Host "Source not found: $In" -ForegroundColor Red; exit 1 }

$src = [System.Drawing.Image]::FromFile($In)
Write-Host ("Source: {0} x {1}px" -f $src.Width, $src.Height) -ForegroundColor Cyan

if ($X -lt 0 -or $Y -lt 0 -or $Size -lt 0) {
    Write-Host "No crop given. Re-run with -X -Y -Size to produce the avatar." -ForegroundColor Yellow
    $src.Dispose()
    exit 0
}

# Keep the requested square inside the image bounds.
$Size = [Math]::Min($Size, [Math]::Min($src.Width, $src.Height))
$X = [Math]::Max(0, [Math]::Min($X, $src.Width  - $Size))
$Y = [Math]::Max(0, [Math]::Min($Y, $src.Height - $Size))
Write-Host ("Crop:   x=$X y=$Y size=$Size  ->  ${Output}x${Output}") -ForegroundColor Cyan

$dest = New-Object System.Drawing.Bitmap($Output, $Output)
$dest.SetResolution(96, 96)
$g = [System.Drawing.Graphics]::FromImage($dest)
$g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

$srcRect  = New-Object System.Drawing.Rectangle($X, $Y, $Size, $Size)
$destRect = New-Object System.Drawing.Rectangle(0, 0, $Output, $Output)
$g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

$dir = Split-Path $Out -Parent
if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }

# JPEG at quality 90 — plenty for a 800px avatar, keeps the file small.
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters(1)
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality, 90)
$dest.Save($Out, $codec, $params)

$g.Dispose(); $dest.Dispose(); $src.Dispose()
Write-Host ("Wrote {0} ({1} KB)" -f $Out, [math]::Round((Get-Item $Out).Length / 1KB)) -ForegroundColor Green
