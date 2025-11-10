# Bicep GUID Encoder Optimization

## Problem
Previously, the GUID encoder was called multiple times during deployment:
- Once in `app-registration.bicep` 
- Each call created an Azure deployment script resource
- Deployment scripts incur compute costs and execution time

## Solution
Optimized to run the GUID encoder **once** in the main template:

### Architecture Changes

1. **azure-local.bicep** (Main Template)
   - Added `guidEncoder` module at the top (runs only on first deployment)
   - Encodes the tenant ID once and stores result
   - Passes encoded value to child modules

2. **app-registration.bicep** (Module)
   - Removed internal `guid-encoder.bicep` module call
   - Added `encodedTenantId` parameter
   - Uses pre-encoded value from parent template

### Benefits

✅ **Performance**: Faster deployments (fewer deployment script executions)  
✅ **Cost**: Lower costs (deployment scripts charge per execution)  
✅ **Efficiency**: Single source of truth for encoded tenant ID  
✅ **Maintainability**: Clearer dependency chain  

### Code Flow

```
azure-local.bicep
  ├─ guidEncoder module (runs once)
  │   └─ outputs: encodedGuid
  │
  └─ ssoAppRegistration module
      ├─ params: encodedTenantId = guidEncoder.outputs.encodedGuid
      └─ uses encodedTenantId directly (no internal encoding)
```

### Technical Details

**Before:**
```bicep
// app-registration.bicep
module tenantIdEncoder 'guid-encoder.bicep' = {
  name: 'encode-tenant-${uniqueString(tenantId)}'
  params: {
    guidToEncode: tenantId
    location: location
  }
}
var calculatedEncodedTenantId = tenantIdEncoder!.outputs.encodedGuid
```

**After:**
```bicep
// azure-local.bicep
module guidEncoder 'modules/guid-encoder.bicep' = if (isFirstTimeDeployment) {
  name: 'encode-tenant-guid-local'
  params: {
    guidToEncode: tenantId
    location: location
  }
}

module ssoAppRegistration 'modules/app-registration.bicep' = if (isFirstTimeDeployment) {
  params: {
    encodedTenantId: guidEncoder!.outputs.encodedGuid
    // ... other params
  }
}

// app-registration.bicep
param encodedTenantId string
var myfciSubject = '/eid1/c/pub/t/${encodedTenantId}/a/...'
```

## Testing

To verify the optimization:

1. **Clean deployment** (first time):
   ```powershell
   atk provision --env local
   ```
   - GUID encoder runs once in main template
   - Encoded value passed to app-registration
   - Both OAuth connections use same encoded value

2. **Subsequent deployments**:
   ```powershell
   atk provision --env local
   ```
   - GUID encoder skipped (not first deployment)
   - Faster execution, no encoding costs

## Impact

- **Deployment Time**: Reduced by eliminating redundant deployment script executions
- **Cost**: Lower Azure costs (fewer deployment script container instances)
- **Reliability**: Single encoding point reduces chance of inconsistencies
