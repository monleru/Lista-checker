import axios from 'axios'
import { createWalletClient, http } from 'viem'
import { bsc } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'
import fs from 'fs'
import chalk from 'chalk';

const log = console.log;
let amount = 0
const start = async (key: `0x${string}`) => {
    const account = privateKeyToAccount(key)
    const client = createWalletClient({
        account,
        chain: bsc,
        transport: http(),
      })
      try{
        const message = `Thank you for your support of Lista DAO. Sign in to view airdrop details.`
        const signature = await client.signMessage({account, message})
        const reponse = await axios.get(`https://api.lista.org/api/airdrop/proof?address=${account.address}&message=Thank+you+for+your+support+of+Lista+DAO.+Sign+in+to+view+airdrop+details.&signature=${signature}`)
        log(chalk.blue(account.address + ": ") + Number(reponse.data.data.amount))
        amount += Number(reponse.data.data.amount)
      } catch(e) {
        log(chalk.blue(account.address + ": ") + e.message)
      }
}

    const fileContents = fs.readFileSync('./keys/keys.txt', 'utf-8')
    const keys = [...new Set(fileContents.split('\n'))].map((i) => i.trim()).filter((i) => i.length > 0) as `0x${string}`[]
    
    for (const key of keys ) {
        try{
            await start(key)
        }
        catch(e) {
            console.log(e.message)
        }
    }

    log(amount)