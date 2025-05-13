# Autopatcher Pipeline Specification

This document describes the technical pipeline for the autopatcher system, used to automate the patching, building, and integration process of packages such as `electron-builder`.

---

## Pipeline Steps

### 1. Manual Trigger

A GitHub Actions workflow is manually triggered by a developer to begin the update process.

### 2. Branch Initialization

The workflow checks out a new branch named:

```
electron-builder-autopatch
```

### 3. Autopatcher Execution

The following command is executed by the workflow:

```
pnpm run autopatcher electron-builder
```

This runs the autopatcher script located at:

```
muffon/scripts/autopatcher/main.js
```

### 4. Patch Directory Check

The script verifies whether a patch directory for the target package exists:

```
muffon/patches/<package>
```

For example, if the target is `electron-builder`, the following must exist:

```
muffon/patches/electron-builder
```

If it does not exist, the autopatcher terminates.

### 5. Package Cloning

If the patch directory exists, the autopatcher retrieves the Git URL for the package from `data.json`, then clones the repository.

### 6. Recursive Patching

Once cloning is complete, the autopatcher applies patches recursively to the cloned repository.

### 7. Build Process

After patching, the GitHub Actions workflow proceeds to build the patched package.

### 8. Patch Folder Integration

A post-build script performs the following:

- Runs `pnpm patch electron-builder` to generate a patch folder.
- Copies necessary assets from the built output to the patch directory.
- Executes:

```
pnpm patch-commit <patch_folder>
```

### 9. Commit Changes

The workflow commits the changes using the message:

```
Autopatch electron-builder
```

It then pushes the commit to the `electron-builder-autopatch` branch.

### 10. Pull Request Creation

Finally, the workflow creates a pull request from the newly pushed branch.
