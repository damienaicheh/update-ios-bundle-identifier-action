import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as fs from 'fs';
import * as plist from 'plist';

process.on('unhandledRejection', handleError)
main().catch(handleError)

async function main(): Promise<void> {
    try {
        let printFile = getBooleanInput('print-file');
        let infoPlistPath = core.getInput('info-plist-path');

        if (!fs.existsSync(infoPlistPath)) {
            core.setFailed(`The file path for the Info.plist does not exist or is not found: ${infoPlistPath}`);
            process.exit(1);
        }

        core.debug(`Running action with ${infoPlistPath}`);

        let bundleIdentifier: string = core.getInput('bundle-identifier');
        let bundleName: string = core.getInput('bundle-name');
        let bundleDisplayName: string = core.getInput('bundle-display-name');

        if (!bundleIdentifier) {
            core.setFailed(`Bundle Identifier has no value: ${bundleIdentifier}. You must define it.`);
            process.exit(1);
        }

        if (printFile) {
            core.info('Before update:');
            await exec.exec('cat', [infoPlistPath]);
        }


        let fileContent = fs.readFileSync(infoPlistPath, { encoding: 'utf8' });
        core.debug(JSON.stringify(fileContent));

        let obj = plist.parse(fileContent);
        obj['CFBundleIdentifier'] = bundleIdentifier;
        if (bundleName) {
            obj['CFBundleName'] = bundleName;
        }

        if (bundleDisplayName) {
            obj['CFBundleDisplayName'] = bundleDisplayName;
        }

        fs.chmodSync(infoPlistPath, "600");
        fs.writeFileSync(infoPlistPath, plist.build(obj));

        if (printFile) {
            core.info('After update:');
            await exec.exec('cat', [infoPlistPath]);
        }

        core.info(`Info.plist updated successfully`);
    } catch (error) {
        core.setFailed(error.message);
    }
}

function handleError(err: any): void {
    console.error(err)
    core.setFailed(`Unhandled error: ${err}`)
}

function getBooleanInput(inputName: string, defaultValue: boolean = false): boolean {
    return (core.getInput(inputName) || String(defaultValue)).toUpperCase() === 'TRUE';
}