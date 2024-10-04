# Introduction to the new Polkadot API

Welcome to the first interactive tutorial of the new Polkadot API.

This is a guided tutorial intended to teach readers how to set up, use and interact with Substrate based chains by using the new [Polkadot-API](https://github.com/polkadot-api/polkadot-api).

### What is the fuss about

The new Polkadot API (PAPI) is:

- 🪶 **light client first**: built on top of the [new JSON-RPC spec](https://paritytech.github.io/json-rpc-interface-spec/) to fully leverage the potential of light-clients;
- 💡 delightful **TypeScript support** with types and docs generated from on-chain metadata;
- 📋 first class support for **storage** reads, **constants**, **transactions**, **events** and **runtime calls**;
- 🔗 perform **multiple connections** to different chains simultaneously;
- 🔄 prepare for upcoming **runtime updates** by generating multiple descriptors and performing **compatibility checks**;
- 🚀 **performant and lightweight**: ships with multiple subpaths, so dApps don't bundle unnecessary assets;
- 🔢 uses **native BigInt**, instead of large BigNumber libraries;
- ⚡ leverages dynamic imports to favour **faster loading times**;
- ✨ **promise-based and Observable-based APIs**: use the one that best suits your needs and/or coding style;
- 🔑 use **signers** from your browser extension, or from a private key;
- 🧩 easy integration with **PJS-based extensions**.

While Polkadot API is a very interesting approach and way of interacting with Substrate based chains, I have found it quite challenging to twist my mindset from existing approaches (e.g. PolkadotJS) to installing and using Polkadot-API.

Having said that, after a few retries and with some help from the creators ([Josep](https://github.com/josepot) and [Victor](https://github.com/voliva)) I found myself loving, using it and adding it in existing and new projects.

### What this tutorial is about

This tutorial is meant for developers who want to install Polkadot-API (or aka PAPI) in a project, add correctly some chains in the project and interact with them with various ways (web socket, smoldot etc.).

In order to address this, we will set up a simple TypeScript project with the minimum needed configuration, run the basic steps needed to "integrate"/"add" (use whatever word fits you best here), the chains we need to connect to in our project and then create some sample calls.

### What this tutorial is **not** about

- **Not a Comprehensive Guide:** This tutorial focuses on the bare minimum needed to use the Polkadot API in a TypeScript project. It will help you set up a basic project, integrate various chains (including well-known, system chains, or those from a given chainspec), and utilize the Polkadot API.

- **Not a Substitute for Foundational Knowledge:** While this tutorial is designed to be accessible even if you have little prior experience with the Polkadot API or interactions with Substrate chains, it does not replace a basic introduction to these topics. We recommend familiarizing yourself with the fundamentals, either before or alongside this tutorial.

- **Not an All-in-One Resource:** This is a step-by-step guide aimed at helping you set up the Polkadot API in your project. It is highly recommended to refer to the official [Polkadot API documentation (http://papi.how)](http://papi.how) throughout your learning process and ensure you have a basic understanding of [TypeScript](https://www.typescriptlang.org/).

- **Not for Experts Only:** You don’t need to be an expert in every topic covered here, but having some exposure to them will enhance your understanding.

This tutorial is divided into sections, each targeting specific learning goals and offering natural pause points. All content is open source and freely accessible [here](https://github.com/wirednkod/papi-intro-tutorial).

Suggestions for improvement, comments, issues, and pull requests are welcome.

Enjoy, and I hope you find this tutorial informative and valuable!
