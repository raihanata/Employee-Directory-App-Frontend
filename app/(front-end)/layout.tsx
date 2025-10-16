  'use client'

  import { ApolloProvider } from '@apollo/client/react'
  import React from 'react'
  import client from '../../lib/apollo-client'

  const UserLayout = ({ children }: { children: React.ReactNode;}) => {
    return (
      <>
      <ApolloProvider client={client}>
      {children}
      </ApolloProvider>
      </>
    )
  }

  export default UserLayout