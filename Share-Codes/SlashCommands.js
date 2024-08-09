
const { ApplicationCommand } = require('discord.js');
function synchronizeSlashCommands(client){
//////////////////Commands/////////////////
const commands = [
////////
{
    name:"code", 
    description:"Share Codes (Only Admin)", 
    options:[{
        name:"code", 
        description: "Paste the code you want to share", 
      type:"STRING", 
      required:true
    }, 
    {
        name:"title", 
        description:"title of The Code", 
        type:"STRING", 
        required:true
    }, 
    {
        name:"description", 
        description:"Description Of The Code", 
        type:"STRING", 
        required:true
    }, 
    {
        name:"creator", 
        description:"the creator Of The Code", 
        type:"USER", 
        required:true, 
    }]   
}]
 client.application.commands.fetch().then(async currentCommands => {
        let newCommands = commands.filter((command) => !currentCommands.some((c) => c.name === command.name));
        for (let newCommand of newCommands) {
            await client.application.commands.create(newCommand);
        }
        let updatedCommands = commands.filter((command) => currentCommands.some((c) => c.name === command.name));
        let updatedCommandCount = 0;
        for (let updatedCommand of updatedCommands) {
            const previousCommand = currentCommands.find((c) => c.name === updatedCommand.name);
            const newCommand = updatedCommand;
            let modified = false;
            if (previousCommand.description !== newCommand.description) modified = true;
            if (!ApplicationCommand.optionsEqual(previousCommand.options ?? [], newCommand.options ?? [])) modified = true;
            if (modified) {
                await previousCommand.edit(newCommand);
                updatedCommandCount++;
            }
        }
        let deletedCommands = currentCommands.filter((command) => !commands.some((c) => c.name === command.name)).toJSON();
        for (let deletedCommand of deletedCommands) {
            await deletedCommand.delete();
        }
    })
  }
//////////////////Dont Touch///////////////// 
module.exports = {synchronizeSlashCommands}

