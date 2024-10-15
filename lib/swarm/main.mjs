import { logger } from '../utils/index.mjs';
/**
 *
 */
export let swarm = {};
/**
 *
 */
export const prune = async () => {
    const peerIds = Object.keys(swarm);
    logger(`✓ pruned swarm (new size ${peerIds.length})`, 'swarm');
    peerIds.map((peerId) => {
        logger(`  → peer ${peerId}`, 'swarm');
    });
};
/**
 *
 * @param peerId
 * @returns
 */
export const getPeer = (peerId) => {
    return swarm[peerId];
};
/**
 *
 * @param peerId
 * @param data
 * @returns
 */
export const addPeer = (peerId, data = {}) => {
    if (getPeer(peerId)) {
        logger(`${peerId} is already part of the swarm`, 'swarm');
        return;
    }
    const since = `${Date.now()}`;
    swarm[peerId] = ({ peerId, since, ...data });
};
/**
 *
 * @param peerId
 * @param data
 * @returns
 */
export const updatePeer = async (peerId, data = {}) => {
    let peer = getPeer(peerId);
    if (!peer) {
        return addPeer(peerId, data);
    }
    const lastUpdate = `${Date.now()}`;
    swarm[peerId] = { ...peer, ...data, lastUpdate };
    logger(`✓ updated swarm peer ${peerId} (new swarm size: ${Object.keys(swarm).length})`, 'swarm');
};
/**
 *
 * @param peerId
 * @returns
 */
export const removePeer = (peerId) => {
    if (!getPeer(peerId)) {
        logger(`${peerId} is not part of the swarm`, 'swarm');
        return;
    }
    delete swarm[peerId];
    logger(`✓ removed ${peerId} from the swarm`, 'swarm');
};
