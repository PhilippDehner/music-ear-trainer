$sourcedir = ".\publish\"
$targetfile = ".\music-ear-trainer.zip"

if (Test-Path $sourcedir) {
	Remove-Item $sourcedir -Recurse 
}
if (Test-Path $targetfile) {
	Remove-Item $targetfile -Recurse 
}

dotnet publish -c Release -o $sourcedir
Compress-Archive -Path $sourcedir* -DestinationPath $targetfile -Force

pause