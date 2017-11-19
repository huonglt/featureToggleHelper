const { readFile, writeFile } = require('./util');

const applyToggleFeature = (featureName, fromStr) => {
    //const regStr = `(['"]*${featureName}['"]*)([\\s:{]*)(name[\\s:].*[,])([\\s]*)(enable[\\s:]*)([true|false]*)([\\s}]*)`;
    const regStr = `(['"]*${featureName}['"]*)([\\s:{]*)(name[\\s:]*.*[\\s,]*)(enable[\\s:]*)([true|false]*)([\\s}]*)`;
    console.log(`regStr = ${regStr}`);
    const groupIndexToToggle = 5;
    const regExp = new RegExp(regStr, 'g');

    const result = regExp.exec(fromStr);
    if(result) {
        const arr = [];
        result.forEach((item, index) => {
            if(index > 0) {
                if(index === groupIndexToToggle) {
                    const replacement = (result[index] === 'true') ? false : true;
                    arr.push(replacement);
                } else {
                    arr.push(result[index]);
                }
            }
        });
        return fromStr.replace(regExp, ''.concat(...arr));
    }
    return null;
}

const toggleFeature = (filePath, featureName) => {
    readFile(filePath).then((data) => {
        const result = applyToggleFeature(featureName, data);
        if(result) {
            writeFile(filePath, result).then(console.log('Complete!'));
        }
    }).catch((err) => console.log(JSON.stringify(err)));
}

async function toggleFeatureAsync(filePath, featureName) {
    const data = await readFile(filePath);
    const result = applyToggleFeature(featureName, data);
    await writeFile(filePath, result);
    
}
//toggleFeature('data.js', 'FEATURE_A');

toggleFeatureAsync('data.js', 'FEATURE_A').then(console.log('Complete!'))
.catch((err) => {
    console.log(JSON.stringify(err));
});
