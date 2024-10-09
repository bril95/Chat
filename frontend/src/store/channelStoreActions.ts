import channelStore from "./channelStore";
import { Channel } from "./interface";

// Геттеры
// export const getAllChannels = () => channelStore((store) => store.allChannels);
// export const getCurrentChannel = () => channelStore((store) => store.currentChannel);
// export const getCurrentChannelPopover = () => channelStore((store) => store.currentChannelPopover);

// Сеттеры
// export const setAllChannels = () => (channel: Channel) => {
//   const set = channelStore((store) => store.setAllChannels);
//   return set(channel);
// }
// export export const setCurrentChannel = (channel: Channel) => {
//   const set = channelStore((store) => store.setCurrentChannel);
//   return set(channel);
// }
// export const setCurrentChannelPopover = (channel: Channel) => {
//   const set = channelStore((store) => store.setCurrentChannelPopover);
//   return set(channel);
// }

// Геттеры
export const getAllChannels = () => channelStore.getState().allChannels;
export const getCurrentChannel = () => channelStore.getState().currentChannel;
export const getCurrentChannelPopover = () => channelStore.getState().currentChannelPopover;

// Сеттеры
export const setAllChannels = (channels: Channel) => channelStore.getState().setAllChannels(channels);
export const setCurrentChannel = (channel: Channel) => channelStore.getState().setCurrentChannel(channel);
export const setCurrentChannelPopover = (channel: Channel) => channelStore.getState().setCurrentChannelPopover(channel);