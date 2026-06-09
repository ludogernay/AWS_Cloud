const { exec } = require("child_process");

exec("node ./node_modules/next/dist/bin/next start -p 3000 -H 0.0.0.0", (error, stdout, stderr) => {
  if (error) {
    console.error(`Erreur : ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Erreur (stderr) : ${stderr}`);
    return;
  }
  console.log(`Sortie : ${stdout}`);
});
