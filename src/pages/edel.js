import React from "react"
import Layout from "../components/Layout"
import EdelList from "../components/EdelList"

export default function IndexPage() {
  return (
    <Layout page="home" bgColor="inherit">
      <section>
        <EdelList />
      </section>
    </Layout>
  )
}