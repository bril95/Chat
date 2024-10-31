interface ChannelResponse {
  name: FormDataEntryValue | null;
}

interface MessageResponse {
  body: FormDataEntryValue | null;
  channelId: string;
  username: string;
}

export { type ChannelResponse, type MessageResponse };
