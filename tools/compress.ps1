# 立绘/背景批量重命名 + 压缩
# 按生成顺序映射：4 张立绘 + 5 张背景
# 输出：宽 540 的 JPEG（质量 72），单张约 40-80KB

Add-Type -AssemblyName System.Drawing

$dir = "c:\Users\37653\Desktop\LoveStory\miniprogram\packageAssets\images"
$names = @(
  'linwan', 'shenjia', 'zhouran', 'xunian',
  'bg_room_night', 'bg_office', 'bg_cafe', 'bg_street', 'bg_archive'
)

$files = Get-ChildItem -Path $dir -Filter *.png | Sort-Object CreationTime
Write-Output ("found: " + $files.Count)

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq 'image/jpeg' }

for ($i = 0; $i -lt $files.Count; $i++) {
  if ($i -ge $names.Count) { break }
  $src = $files[$i].FullName
  $dst = Join-Path $dir ($names[$i] + '.jpg')

  $img = [System.Drawing.Image]::FromFile($src)
  $w = 540
  $h = [int]([math]::Round($img.Height * 540 / $img.Width))
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.DrawImage($img, 0, 0, $w, $h)
  $g.Dispose()

  $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality, 72L)
  $bmp.Save($dst, $codec, $params)
  $bmp.Dispose()
  $img.Dispose()

  $size = [math]::Round((Get-Item $dst).Length / 1KB, 1)
  Write-Output ($names[$i] + ".jpg  " + $size + " KB")
}

Get-ChildItem -Path $dir -Filter *.png | Remove-Item -Force
Write-Output "done"
