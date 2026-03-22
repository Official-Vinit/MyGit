const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid').v4;

async function commitRepo(message) {
    const repoPath = path.join(process.cwd(), '.mygit');
    const stagedPath = path.join(repoPath, 'staging');
    const commitsPath = path.join(repoPath, 'commits');

    try{
        const commitId = uuid();
        const commitDir = path.join(commitsPath, commitId);
        await fs.mkdir(commitDir,{recursive:true})

        const files = await fs.readdir(stagedPath);
        for(const file of files){
            await fs.copyFile(path.join(stagedPath,file),path.join(commitDir,file))
        }
        await fs.writeFile(path.join(commitDir,"commit.json"), JSON.stringify({message,date: new Date().toISOString()}))

        console.log(`Commit ${commitId} created with message :${message}`);
    }catch(err){
        console.error("Error commiting files: ", err);
    }
}

module.exports = {
    commitRepo
}