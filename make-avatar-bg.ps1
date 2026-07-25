# Replaces the wall behind the subject with the site's purple gradient.
#
#   .\make-avatar-bg.ps1
#   .\make-avatar-bg.ps1 -Tolerance 34 -Feather 2
#
# Uses region growing seeded from the image border: a pixel joins the background
# if it is close in colour to the neighbour it spread from. That follows the
# wall's light gradient and the white/tan seam without a fixed threshold, and
# stops at the subject, whose hair, skin and shirt are all far darker.

param(
    [string]$In        = "D:\personal\portfolio\public\profile.jpg",
    [string]$Out       = "D:\personal\portfolio\public\profile.jpg",
    [int]$Tolerance    = 32,   # per-step colour distance allowed while growing
    [int]$Feather      = 2,    # mask blur radius, softens the cut edge
    [int]$MinLuma      = 95    # a pixel this dark is never treated as wall
)

Add-Type -AssemblyName System.Drawing

$code = @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;

public static class BgCut {
  public static void Run(string inPath, string outPath, int tol, int feather, int minLuma) {
    Bitmap src = new Bitmap(inPath);
    int w = src.Width, h = src.Height;

    byte[] r = new byte[w*h], g = new byte[w*h], b = new byte[w*h];
    BitmapData bd = src.LockBits(new Rectangle(0,0,w,h), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
    byte[] buf = new byte[Math.Abs(bd.Stride)*h];
    System.Runtime.InteropServices.Marshal.Copy(bd.Scan0, buf, 0, buf.Length);
    src.UnlockBits(bd);
    for (int y=0; y<h; y++)
      for (int x=0; x<w; x++) {
        int o = y*bd.Stride + x*4, i = y*w+x;
        b[i]=buf[o]; g[i]=buf[o+1]; r[i]=buf[o+2];
      }

    // ---- region grow from every border pixel ----
    bool[] bg = new bool[w*h];
    Queue<int> q = new Queue<int>();
    for (int x=0; x<w; x++) { Seed(x, 0, w, h, bg, q); Seed(x, h-1, w, h, bg, q); }
    for (int y=0; y<h; y++) { Seed(0, y, w, h, bg, q); Seed(w-1, y, w, h, bg, q); }

    int[] dx = {1,-1,0,0,1,1,-1,-1};
    int[] dy = {0,0,1,-1,1,-1,1,-1};
    while (q.Count > 0) {
      int i = q.Dequeue();
      int cx = i % w, cy = i / w;
      for (int k=0; k<8; k++) {
        int nx = cx+dx[k], ny = cy+dy[k];
        if (nx<0 || ny<0 || nx>=w || ny>=h) continue;
        int ni = ny*w+nx;
        if (bg[ni]) continue;
        int luma = (r[ni]*299 + g[ni]*587 + b[ni]*114) / 1000;
        if (luma < minLuma) continue;                 // too dark to be the wall
        int dr = r[ni]-r[i], dg = g[ni]-g[i], db = b[ni]-b[i];
        if (dr*dr + dg*dg + db*db > tol*tol*3) continue;
        bg[ni] = true; q.Enqueue(ni);
      }
    }

    // ---- mask: 255 = subject, 0 = background, then blur to feather ----
    float[] mask = new float[w*h];
    for (int i=0; i<w*h; i++) mask[i] = bg[i] ? 0f : 1f;
    if (feather > 0) mask = Blur(mask, w, h, feather);

    // ---- composite over the site's violet -> fuchsia gradient ----
    Bitmap dst = new Bitmap(w, h, PixelFormat.Format24bppRgb);
    BitmapData od = dst.LockBits(new Rectangle(0,0,w,h), ImageLockMode.WriteOnly, PixelFormat.Format24bppRgb);
    byte[] ob = new byte[Math.Abs(od.Stride)*h];
    for (int y=0; y<h; y++) {
      for (int x=0; x<w; x++) {
        int i = y*w+x;
        // diagonal gradient #7c3aed -> #c026d3
        float t = ((float)x/w * 0.5f) + ((float)y/h * 0.5f);
        int br = (int)(124 + (192-124)*t);
        int bgc= (int)( 58 + ( 38- 58)*t);
        int bb = (int)(237 + (211-237)*t);
        float m = mask[i];
        int o = y*od.Stride + x*3;
        ob[o]   = (byte)Math.Max(0, Math.Min(255, b[i]*m + bb *(1-m)));
        ob[o+1] = (byte)Math.Max(0, Math.Min(255, g[i]*m + bgc*(1-m)));
        ob[o+2] = (byte)Math.Max(0, Math.Min(255, r[i]*m + br *(1-m)));
      }
    }
    System.Runtime.InteropServices.Marshal.Copy(ob, 0, od.Scan0, ob.Length);
    dst.UnlockBits(od);
    src.Dispose();

    int cut = 0; for (int i=0;i<w*h;i++) if (bg[i]) cut++;
    Console.WriteLine("background pixels removed: " + (cut*100/(w*h)) + "%");

    ImageCodecInfo jpg = null;
    foreach (ImageCodecInfo c in ImageCodecInfo.GetImageEncoders()) if (c.MimeType=="image/jpeg") jpg = c;
    EncoderParameters ep = new EncoderParameters(1);
    ep.Param[0] = new EncoderParameter(Encoder.Quality, 92L);
    dst.Save(outPath, jpg, ep);
    dst.Dispose();
  }

  static void Seed(int x, int y, int w, int h, bool[] bg, Queue<int> q) {
    int i = y*w+x; if (!bg[i]) { bg[i]=true; q.Enqueue(i); }
  }

  static float[] Blur(float[] m, int w, int h, int rad) {
    float[] tmp = new float[w*h], outp = new float[w*h];
    for (int y=0; y<h; y++)
      for (int x=0; x<w; x++) {
        float s=0; int n=0;
        for (int k=-rad; k<=rad; k++) { int xx=x+k; if (xx<0||xx>=w) continue; s+=m[y*w+xx]; n++; }
        tmp[y*w+x] = s/n;
      }
    for (int y=0; y<h; y++)
      for (int x=0; x<w; x++) {
        float s=0; int n=0;
        for (int k=-rad; k<=rad; k++) { int yy=y+k; if (yy<0||yy>=h) continue; s+=tmp[yy*w+x]; n++; }
        outp[y*w+x] = s/n;
      }
    return outp;
  }
}
'@

Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing -ErrorAction Stop

if (-not (Test-Path $In)) { Write-Host "Not found: $In" -ForegroundColor Red; exit 1 }
[BgCut]::Run($In, $Out, $Tolerance, $Feather, $MinLuma)
Write-Host ("Wrote {0} ({1} KB)" -f $Out, [math]::Round((Get-Item $Out).Length/1KB)) -ForegroundColor Green
