const express = require('express')
const app = express()
app.get('/', function (req, res) {
  res.send('Hi i’m Kaido')
})
app.listen(3000)

const { Client, Intents, MessageEmbed} = require('discord.js');
const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
const {synchronizeSlashCommands} = require("./SlashCommands.js")


client.on('ready', () => {
  synchronizeSlashCommands(client);
  console.log(`Logged in as ${client.user.tag}!`);
 

  client.user.setActivity(`DEVELOPER CODING {/}`, {type:"PLAYING"});

});

client.on('interactionCreate', async interaction => {
      if(interaction.isCommand()){
        let args = [];
        for (let option of interaction.options.data) {
          if (option.type === "SUB_COMMAND") {
            if (option.name) args.push(option.name);
            if (option.options) {
              option.options.forEach((x) => {
                if (x.value) args.push(x.value);
              });
            }
          } else if (option.value) args.push(option.value);
        }
 
const { MessageButton } = require("discord.js")
const { MessageActionRow } = require("discord.js")
const { MessageEmbed } = require("discord.js")
        
 

if(interaction.commandName === "code"){ 
   if(!interaction.member.roles.cache.has("id role")) return interaction.reply({content: "This Command Only For Admin", ephemeral:true})
const ch = client.channels.cache.get("id ch")// ايدي الروم هنا
    const code = interaction.options.getString("code")
const title = interaction.options.getString("title")
const description = interaction.options.getString("description") 
const cr = interaction.options.getUser("creator")
    const embed = new MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`\`\`\`js\n${code}\`\`\``)
 .addField("🪧 Title :", title, true)
 .addField("📝 Description :", description , true)
 .addField("👤 Author :", interaction.user.username)
.addField("© the creator :", cr.username,true)
    ch.send({embeds:[embed],
components: [new MessageActionRow().addComponents(new MessageButton().setLabel("Copy").setStyle("SECONDARY").setEmoji("©") .setCustomId("copypi"))]})
    await interaction.reply({content:"DONE BUT WAIT PLS", ephemeral:true})
  }

client.on("interactionCreate", async (interaction) => {
    if(interaction.isButton()) {
        if(interaction.customId == "copypi") {
          
            interaction.user.send({
                content: interaction.message?.embeds[0]?.description || "error" || null || "",
            
            }).catch(async (error) => {
              console.error(error)
                return interaction.reply({
                                 content: `error`,
                                 ephemeral: true,
});

            });
await interaction.reply({
  content: "done sent from your dm / تم ارسال في خاصك",
  ephemeral: true
})
        };
      };
    }); 
  }
})
////client login
client.login(process.env.token);