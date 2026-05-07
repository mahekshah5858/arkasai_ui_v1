# Start local HTTP server for Verity Signal (required; file:// breaks Babel .jsx loads)
Set-Location $PSScriptRoot
Write-Host "Starting server in: $PSScriptRoot" -ForegroundColor Cyan
node .\static-server.cjs
