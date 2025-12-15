$exe = where.exe devtunnel.exe
if ("" -eq $exe) {
  Write-Host "Dev Tunnels CLI not found. Please install: https://learn.microsoft.com/azure/developer/dev-tunnels/get-started"
  exit
}

$tunnelId = ""
$envFile = ".\env\.env.local"
$envFileContent = Get-Content $envFile
$envFileContent | ForEach-Object {
  if ($_ -like "TUNNEL_ID=*") {
    $tunnelId = $_.Split("=")[1].Trim()
  }
}

if ($tunnelId -eq "") {
  Write-Host "No TUNNEL_ID found. Creating tunnel..."

  Write-Host "Logging in to Dev Tunnels..."
  devtunnel user login > $null
    
  Write-Host "Creating tunnel..."
  $tunnel = devtunnel.exe create
  $tunnelId = $tunnel -split '\r?\n' | Select-String 'Tunnel ID' | ForEach-Object { ($_ -split ':')[1].Trim() }
    
  Write-Host "Creating port and access..."
  $port = 3978
  devtunnel port create $tunnelId -p $port > $null
  devtunnel access create $tunnelId -p $port -a > $null
    
  Write-Host "Updating env\.env.local..."

  $hostname = $tunnelId.split('.')[0]
  $cluster = $tunnelId.split('.')[1]

  $domain = "$hostname-$port.$cluster.devtunnels.ms"
  $endpoint = "https://$domain"

  $envFileContent | ForEach-Object {
    $line = $_
    if ($line -like "BOT_ENDPOINT=*") {
      $line = "BOT_ENDPOINT=$endpoint/api/messages"
    }
    if ($line -like "BOT_DOMAIN=*") {
      $line = "BOT_DOMAIN=$domain"
    }
    if ($line -like "TUNNEL_ID=*") {
      $line = "TUNNEL_ID=$tunnelId"
    }
    $line
  } | Set-Content $envFile

  Write-Host "TUNNEL_ID: $tunnelId"
  Write-Host "BOT_ENDPOINT: $endpoint"
  Write-Host "BOT_DOMAIN: $domain"
}

devtunnel.exe host $tunnelId