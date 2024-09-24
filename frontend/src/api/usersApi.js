import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from './routes';

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.defaultApi(),
    prepareHeaders: (headers, { getState }) => {
      const { auth: { token } } = getState();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (user) => ({
        method: 'POST',
        body: user,
        url: routes.path.signUpPath(),
      }),
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        method: 'POST',
        body: user,
        url: routes.path.loginPath(),
      }),
    }),
    getChannels: builder.query({
      query: () => routes.path.channelsPath(),
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
        url: routes.path.channelsPath(),
      }),
    }),
    getMessages: builder.query({
      query: () => routes.path.messagesPath(),
    }),
    addMessages: builder.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
        url: routes.path.messagesPath(),
      }),
    }),
    editChannel: builder.mutation({
      query: ({ id, nameChannel }) => ({
        method: 'PATCH',
        body: nameChannel,
        url: routes.path.channelIdPath(id),
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: routes.path.channelIdPath(id),
      }),
    }),
  }),
});

export const {
  useAddUserMutation,
  useLoginUserMutation,
  useGetChannelsQuery,
  useAddChannelMutation,
  useGetMessagesQuery,
  useAddMessagesMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = usersApi;