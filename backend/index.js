const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const { initRepo } = require('./controllers/init');
const { addRepo } = require('./controllers/add');
const { pullRepo } = require('./controllers/pull');
const { pushRepo } = require('./controllers/push');
const { revertRepo } = require('./controllers/revert');
const { commitRepo } = require('./controllers/commit');


yargs(hideBin(process.argv))
.command('start',"Starts a new server",{}, startServer)
.command('init', 'Initialize a new Git repository', {}, initRepo)
.command('add <file>', 'Add files to the staging area', (yargs) => {
    yargs.positional('file', {
        describe: 'File to add to the staging area',
        type: 'string'
    });
}, (argv)=>{
    addRepo(argv.file);
})
.command('commit <message>', 'Commit the staged files',(yargs)=> {
    yargs.positional('message', {
        describe: 'Commit message',
        type: 'string'
    });
}, (argv)=>{
    commitRepo(argv.message);
})
.command('pull', 'Pull changes from the remote repository', {}, pullRepo)
.command('push', 'Push changes to the remote repository', {}, pushRepo)
.command('revert <commitId>', 'Revert to a specific commit', (yargs)=>{
    yargs.positional('commitId', {
        describe: 'ID of the commit to revert to',
        type: 'string'
    });
}, revertRepo)

.demandCommand(1, 'You need to specify a command')
.help().argv;

function startServer(){
    console.log("Server logic called");
}



