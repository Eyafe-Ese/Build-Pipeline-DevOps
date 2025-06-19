const fs = require('fs');
const path = require('path');

function parseLcov(lcovData) {
    const files = [];
    const lines = lcovData.split('\n');
    let currentFile = null;

    for (const line of lines) {
        if (line.startsWith('SF:')) {
            if (currentFile) {
                files.push(currentFile);
            }
            currentFile = {
                path: line.substring(3),
                functions: [],
                lines: [],
                branches: []
            };
        } else if (line.startsWith('FN:')) {
            const parts = line.substring(3).split(',');
            currentFile.functions.push({
                line: parseInt(parts[0]),
                name: parts[1]
            });
        } else if (line.startsWith('FNDA:')) {
            const parts = line.substring(5).split(',');
            const func = currentFile.functions.find(f => f.name === parts[1]);
            if (func) {
                func.hits = parseInt(parts[0]);
            }
        } else if (line.startsWith('DA:')) {
            const parts = line.substring(3).split(',');
            currentFile.lines.push({
                number: parseInt(parts[0]),
                hits: parseInt(parts[1])
            });
        } else if (line.startsWith('BDA:')) {
            const parts = line.substring(4).split(',');
            currentFile.branches.push({
                line: parseInt(parts[0]),
                block: parseInt(parts[1]),
                branch: parseInt(parts[2]),
                hits: parseInt(parts[3])
            });
        }
    }

    if (currentFile) {
        files.push(currentFile);
    }

    return files;
}

function generateCobertura(files, baseDir = '') {
    const timestamp = Math.floor(Date.now() / 1000);
    let totalLines = 0;
    let coveredLines = 0;
    let totalBranches = 0;
    let coveredBranches = 0;

    let packagesXml = '';
    const packages = {};

    // Group files by package (directory)
    files.forEach(file => {
        const relativePath = path.relative(baseDir, file.path);
        const packageName = path.dirname(relativePath).replace(/\\/g, '/') || '.';
        
        if (!packages[packageName]) {
            packages[packageName] = [];
        }
        packages[packageName].push({ ...file, relativePath });

        // Count totals
        totalLines += file.lines.length;
        coveredLines += file.lines.filter(l => l.hits > 0).length;
        totalBranches += file.branches.length;
        coveredBranches += file.branches.filter(b => b.hits > 0).length;
    });

    // Generate package XML
    Object.keys(packages).forEach(packageName => {
        const packageFiles = packages[packageName];
        let packageLines = 0;
        let packageCoveredLines = 0;
        let packageBranches = 0;
        let packageCoveredBranches = 0;

        let classesXml = '';

        packageFiles.forEach(file => {
            const className = path.basename(file.relativePath, path.extname(file.relativePath));
            const fileLines = file.lines.length;
            const fileCoveredLines = file.lines.filter(l => l.hits > 0).length;
            const fileBranches = file.branches.length;
            const fileCoveredBranches = file.branches.filter(b => b.hits > 0).length;

            packageLines += fileLines;
            packageCoveredLines += fileCoveredLines;
            packageBranches += fileBranches;
            packageCoveredBranches += fileCoveredBranches;

            const lineRate = fileLines > 0 ? (fileCoveredLines / fileLines).toFixed(4) : '0.0000';
            const branchRate = fileBranches > 0 ? (fileCoveredBranches / fileBranches).toFixed(4) : '0.0000';

            let linesXml = '';
            file.lines.forEach(line => {
                linesXml += `        <line number="${line.number}" hits="${line.hits}"/>\n`;
            });

            classesXml += `    <class name="${className}" filename="${file.relativePath}" line-rate="${lineRate}" branch-rate="${branchRate}" complexity="0">\n`;
            classesXml += `      <methods/>\n`;
            classesXml += `      <lines>\n${linesXml}      </lines>\n`;
            classesXml += `    </class>\n`;
        });

        const packageLineRate = packageLines > 0 ? (packageCoveredLines / packageLines).toFixed(4) : '0.0000';
        const packageBranchRate = packageBranches > 0 ? (packageCoveredBranches / packageBranches).toFixed(4) : '0.0000';

        packagesXml += `  <package name="${packageName}" line-rate="${packageLineRate}" branch-rate="${packageBranchRate}" complexity="0">\n`;
        packagesXml += `    <classes>\n${classesXml}    </classes>\n`;
        packagesXml += `  </package>\n`;
    });

    const lineRate = totalLines > 0 ? (coveredLines / totalLines).toFixed(4) : '0.0000';
    const branchRate = totalBranches > 0 ? (coveredBranches / totalBranches).toFixed(4) : '0.0000';

    return `<?xml version="1.0" ?>
<!DOCTYPE coverage SYSTEM "http://cobertura.sourceforge.net/xml/coverage-04.dtd">
<coverage line-rate="${lineRate}" branch-rate="${branchRate}" lines-covered="${coveredLines}" lines-valid="${totalLines}" branches-covered="${coveredBranches}" branches-valid="${totalBranches}" complexity="0" version="1.9" timestamp="${timestamp}">
<sources>
  <source>${baseDir || '.'}</source>
</sources>
<packages>
${packagesXml}</packages>
</coverage>`;
}

function convertLcovToCobertura(lcovFile, coberturaFile, baseDir = '') {
    try {
        const lcovData = fs.readFileSync(lcovFile, 'utf8');
        const files = parseLcov(lcovData);
        const coberturaXml = generateCobertura(files, baseDir);
        fs.writeFileSync(coberturaFile, coberturaXml);
        console.log(`✅ Converted ${lcovFile} to ${coberturaFile}`);
    } catch (error) {
        console.error('❌ Error converting LCOV to Cobertura:', error.message);
        process.exit(1);
    }
}

// CLI usage
if (require.main === module) {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.log('Usage: node lcov-to-cobertura.js <lcov-file> <cobertura-file> [base-dir]');
        process.exit(1);
    }
    
    const [lcovFile, coberturaFile, baseDir] = args;
    convertLcovToCobertura(lcovFile, coberturaFile, baseDir);
}

module.exports = { convertLcovToCobertura, parseLcov, generateCobertura };