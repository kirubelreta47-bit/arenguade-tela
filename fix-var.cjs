const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const scriptStart = content.indexOf('<script>');
const scriptEnd = content.indexOf('</script>', scriptStart);

let scriptContent = content.substring(scriptStart, scriptEnd);

scriptContent = scriptContent.replace(/\bconst\b/g, 'var');
scriptContent = scriptContent.replace(/\blet\b/g, 'var');

content = content.substring(0, scriptStart) + scriptContent + content.substring(scriptEnd);

fs.writeFileSync('index.html', content);
console.log("Replaced const/let with var in inline script.");
