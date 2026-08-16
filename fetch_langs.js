fetch('https://translate.googleapis.com/translate_a/l?client=gtx&ui=en').then(r=>r.json()).then(d=>console.log(JSON.stringify(d.sl)))
