
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
    db = await orbitdb.open(address, { sync: true })
    await load(db, 'Loading database...')
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
