# Pull Request

## Description

<!-- Please provide a brief description of the changes in this PR -->

## Type of Change

- [ ] New sample onboarding (internal - source code in this repo)
- [ ] New sample onboarding (external - source code in another repo)
- [ ] Sample update/fix
- [ ] Documentation update
- [ ] Validation tool update
- [ ] Other (please describe)

---

## For New Sample Onboarding

### Checklist

- [ ] I have added/updated the sample entry in `.config/samples-config-v3.json`
- [ ] I have included a README.md with setup instructions
- [ ] I have included a thumbnail image with correct aspect ratio (40:23, e.g., 1600×920 or 800×460)

### Validation Results (Required)

> **Important**: You must run the validation tool locally and provide a screenshot of the results.

#### For Internal Samples (source code in this repo)

```bash
cd validation-tool
npm install
node validator.mjs -p ../<your-sample-folder>
```

#### For External Samples (source code in another repo)

```bash
cd validation-tool
npm install

# Clone your sample repo (sparse checkout recommended)
git clone --filter=blob:none --sparse <your-repo-url>
cd <repo-name>
git sparse-checkout set <path-to-sample>
cd ..

# Run validation
node validate-external.js <sample-id> ./<repo-name>
```


---

## Related Issues

<!-- Link any related issues here, e.g., "Fixes #123" or "Related to #456" -->
if any question related to validation, may refer to the [Sample Validation Guide](validation-tool/sample_validation.md)
if still has questions, may open a issue :)
