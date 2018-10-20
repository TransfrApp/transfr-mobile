
// This file is hosting the initial needs for the DB

import ipfs from 'ipfs';
import orbitdb from 'orbit-db';

let orbitDb, db;

const address = "/orbitdb/QmZEsvcGHMKPSbTe5dR9DApMRuroCuZRjZVNi2w7s11naC/transfr-db"

const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true
  },
  config: {
    Addresses: {
        Swarm: [
            // Use IPFS dev signal server
            // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
            '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star/'
        ]
    },
}
}

// Create IPFS instance
const ipfs = new IPFS(ipfsOptions)

ipfs.on('ready', async () => {
  // Create OrbitDB instance
  orbitdb = new OrbitDB(ipfs);
  await openDatabase()
  repl.start().context.db = db
});

  const openDatabase = async () => {
    try {
      console.log("Connecting to peers...")
      db = await orbitdb.open(address, { sync: true })
      await load(db, 'Loading database...')

      console.log( `Listening for updates to the database...`)
    } catch (e) {
      console.error(e)
    }
  }

  const dataConfig = {
    ipfs,
    orbitDb,
    db,
    address
  }

  export default dataConfig;

    // const load = async (db, statusText) => {
    // console.log("loading")
    // // When the database is ready (ie. loaded), display results
    // db.events.on('ready', () => console.log("ready"))
    // // When database gets replicated with a peer, display results
    // db.events.on('replicated', () => console.log('replicated'))
    // // When we update the database, display result
    // db.events.on('write', () => console.log('write occured'))

    // db.events.on('load.progress', (...args) => {
    //   console.log(args)
    // })

    // db.events.on('ready', () => {
    //   // Set the status text
    //   setTimeout(async () => {
    //     console.log("db is ready!")
    //     const x = await db.get("nolan")
    //     console.log(x)
    //     const y = await db.put("gavin", {x: 2})
    //   }, 1000)
    // })

    // // Load locally persisted database
    // await db.load()
    // }
