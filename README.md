# Update iOS bundle identifier action

This action update the `CFBundleIdentifier`, `CFBundleName` and `CFBundleDisplayName` properties of the Info.plist file for your iOS projects.

## Inputs

### `info-plist-path`

**Required** The relative path for the Info.plist file.

### `bundle-identifier` 
  
**Required** The value of the new  CFBundleIdentifier.

###  `bundle-name`
    
The value of the new CFBundleName.

###  `bundle-display-name`
    
The value of the new CFBundleDisplayName.

###  `print-file`

Output the Info.plist file in console before and after update.

## Usage

```yaml
- name: Update Bundle identifier
  uses: damienaicheh/update-ios-bundle-identifier-action@v1.0.0
  with:
    info-plist-path: './path_to_your/Info.plist'
    bundle-identifier: 'com.mycompany.app'
    bundle-name: 'Name'
    bundle-display-name: 'New App'
    print-file: true
```