const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'result.html');
let html = fs.readFileSync(htmlPath, 'utf-8');

const screenshots = [
    {
        placeholder: '<h3>[Insert Screenshot 1 Here]</h3>',
        file: 'C:\\Users\\ADMIN\\.gemini\\antigravity-ide\\brain\\8330b195-fc82-405c-ab34-5c3a6047a273\\home_screen_1787625836463.png'
    },
    {
        placeholder: '<h3>[Insert Screenshot 2 Here]</h3>',
        file: 'C:\\Users\\ADMIN\\.gemini\\antigravity-ide\\brain\\8330b195-fc82-405c-ab34-5c3a6047a273\\projects_screen_1787625873463.png'
    },
    {
        placeholder: '<h3>[Insert Screenshot 3 Here]</h3>',
        file: 'C:\\Users\\ADMIN\\.gemini\\antigravity-ide\\brain\\8330b195-fc82-405c-ab34-5c3a6047a273\\contact_screen_1787625910227.png'
    },
    {
        placeholder: '<h3>[Insert Screenshot 4 Here]</h3>',
        file: 'C:\\Users\\ADMIN\\.gemini\\antigravity-ide\\brain\\8330b195-fc82-405c-ab34-5c3a6047a273\\services_screen_1787625956914.png'
    }
];

screenshots.forEach(sc => {
    if (fs.existsSync(sc.file)) {
        const base64 = fs.readFileSync(sc.file, 'base64');
        const imgTag = `<img src="data:image/png;base64,${base64}" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin-bottom: 10px;" />`;
        html = html.replace(sc.placeholder, imgTag);
        
        // Remove the placeholder-box class so it doesn't look dashed anymore
        // A simple string replace for the specific block
        html = html.replace('<div class="placeholder-box">\\n        <img', '<div>\\n        <img');
    } else {
        console.error('File not found:', sc.file);
    }
});

// Remove placeholder box classes globally to clean it up
html = html.replace(/class="placeholder-box"/g, 'style="text-align: center; margin-bottom: 20px;"');

fs.writeFileSync(htmlPath, html, 'utf-8');
console.log('Successfully injected Base64 screenshots into result.html');
