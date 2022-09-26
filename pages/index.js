import Head from 'next/head'
import { faTwitter, faGithub, faSlack } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PillBox from '../components/pill-box'
import {CopyIcon, CrossIcon, MenuIcon, CheckIcon} from '@bitcoin-design/bitcoin-icons-react/filled';
import React from 'react';
import Image from 'next/image'
import backgroundImg from "../public/background.png"
import bunnyCrying from "../public/crying@0.5x.png"
import carrot from "../public/carrot@0.5x.png"
import bunnyHacker from "../public/bunny-hacker.png"
import bech32mCodeDiff from "../public/bech32m-code-diff.png"
import carrotsGrowing from "../public/carrots-growing.png"
import bunnyAstronaut from "../public/bunny-astronaut.png"
import bunniesGetInvolved from "../public/bunnies-get-involved.png"
import bech32mQr from "../public/bech32m-qr.png"
import contribs from "../data/formatted/contributors.json"

export default function Home() {
  const sampleAddress = "bc1pmnhwnlcx7w4lfv3txuez6hfup24wkr4yygzugekpmttplx2mnkusw03aln"
  
  const [menuOpen, setMenuOpen] = React.useState(false)
  
  const [sampleActive, setSampleActive] = React.useState(false)
  
  const [sortedContribs, setSortedContribs] = React.useState([])
  
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen)
  }
  
  const toggleSample = (e) => {
    e.preventDefault()
    setSampleActive(!sampleActive)
  }
  
  const changeMenuStyle = (transparent = true) => {
    const header = document.getElementById('header')
    if(transparent) {
      header.classList.add('transparent')
    }
    else {
      header.classList.remove('transparent')
    }
  }
  
  const checkScrollPosition = (e) => {
    if(window.scrollY > 100) changeMenuStyle(false)
    else changeMenuStyle(true)
  }
  
  let copied = false
  
  const copyAddress = () => {
    copied = false
    let copyText = document.getElementById("sample-address")
    copyText.select()
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy");
    copied = true;
    // this.timerHold = true;
    setTimeout(()=>{
      copied = false;
    }, 4000);
  }

  const sortContribs = () => {
    let sorted = contribs.sort((a,b) => {
      let a1 = a.name.toLowerCase()
      let b1 = b.name.toLowerCase()
      return a1 < b1 ? -1 : a1 > b1 ? 1 : 0
    })

    setSortedContribs(sorted)
    return sorted
  }

  React.useEffect(()=>{
    checkScrollPosition()
    window.addEventListener('scroll', checkScrollPosition)
  })
  
  React.useState(()=>{
    sortContribs()
  }, contribs)
  
  const siteNav = [
    {
      uri: "/#intro",
      text: "Home"
    },
    {
      uri: "/#adding-bech32m",
      text: "Adding Bech32m support"
    },
    {
      uri: "/#creating-p2tr-outputs",
      text: "Creating P2TR Outputs"
    },
    {
      uri: "/#features",
      text: "Benefits of taproot"
    },
    {
      uri: "/#support",
      text: "State of taproot support"
    },
    {
      uri: "/#get-involved",
      text: "Get involved"
    },
    {
      uri: "/#terminology",
      text: "Terminology"
    },
    {
      uri: "/#contact",
      text: "Join the discussion"
    }
  ]
  
  return (
    <div>
      <Head>
        <title>When taproot? | Bitcoin Bech32m Adoption Tracking</title>
        <meta name="description" content="Taproot has been live since November 2021, yet the bitcoin industry has not seen widespread adoption of
              Bech32m. What gives? Bunny is sad. When&nbsp;taproot?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;1,400;1,700&family=Sniglet&display=swap"
          rel="stylesheet"
        />
      </Head>
      
      <a href="#start-of-main-content" className="sr-only skip-content">Skip to content</a>
      
      <div
        className={'transition-opacity duration-500 bg-gray-800 w-full h-full fixed z-50 top-0 left-0 opacity-75 xl:hidden ' + (!menuOpen ? 'opacity-0 pointer-events-none' : '')}
        onClick={handleMenuToggle}
      ></div>
      
      <header className={'fixed top-0 left-0 z-50 w-full transparent' + (menuOpen ? ' open' : '')} id="header">
        <div className="relative z-[99]">
          {!menuOpen ?
            <button title="Show Menu" aria-hidden="true" onClick={handleMenuToggle} className="py-4 px-8 xl:hidden">
              <MenuIcon className="w-8 h-8" />
            </button>
            :
            <button title="Close Menu" aria-hidden="true" onClick={handleMenuToggle} className="py-4 px-8 xl:hidden">
              <CrossIcon className="w-8 h-8" />
            </button>
          }
        </div>
        
        <div className="relative z-40">
          <nav role="navigation" className={'menu' + (!menuOpen ? ' closed' : '')}>
            <ul className="text-base font-bold pb-4 xl:text-xs xl:flex xl:justify-center xl:items-center xl:align-center xl:pb-0">
              {siteNav.map((i,key)=>(
                <li>
                  <a className="py-4 px-8 block xl:px-4 no-underline" href={i.uri} onClick={handleMenuToggle}>{i.text}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <a href="#start-of-main-content" id="start-of-main-content" className="sr-only">Start of main content</a>

        <div id="intro"></div>

        {/* Background image */}
        <div className="fixed w-full h-full top-0 left-0 z-[1]">
          <Image
            src={backgroundImg}
            width="3240"
            height="2160"
            layout="fill"
            objectFit="cover"
            sizes="(max-width: 768px) 100vh, 100vw"
            placeholder="blur"
            quality="100"
            className="fixed top-0 left-0"
          />
        </div>
        
        {/* Hero */}
        <div className="relative z-[2]">
          <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 sm:pb-32 md:p-16 md:pb-32 xl:pt-24">
            <div className="bg-white p-8 rounded-3xl drop-shadow-hard-small max-w-2xl 2xl:max-w-5xl">
              <div className="hero pb-8 mx-auto md:scale-125">
                <div className="flex flex-wrap">
                  <div className="basis-[55%] w-[55%] h-auto md:order-first md:basis-[30%] md:w-[30%] flex flex-col justify-center">
                    <Image
                      src={bunnyCrying}
                      alt="Crying bunny"
                      width="941"
                      height="757"
                      layout="responsive"
                    />
                  </div>
                  <img src="hero-title.svg" alt="" width="758" height="231" className="order-last md:order-[1] md:basis-[45%] md:w-[45%]" />
                  <div className="hidden md:block md:order-[2] md:basis-[5%] md:w-[5%]"></div>
                  <div className="basis-[35%] w-[35%] ml-[10%] md:ml-0 md:order-last md:basis-[20%] md:w-[20%] flex flex-col justify-center">
                    <Image
                      src={carrot}
                      alt="Carrot"
                      width="956"
                      height="1080"
                      layout="responsive"
                    />
                  </div>
                </div>
              </div>
              <h1 className="sr-only">When taproot?</h1>
              <p className="text-xl xl:text-2xl 2xl:text-3xl mb-8">
                Taproot offers bitcoin users and businesses big benefits. But to unlock them, first we need wallet
                interoperability. Taproot requires Bech32m, a new address format, which is slightly different from Bech32.
                This means that Taproot adoption will only take off when wallets support sending to this new format.
              </p>
            </div>
          </div>
          
          <div className="w-full">
            <img src="curve-1.svg" width="1728" height="148" className="w-full h-auto translate-y-1 drop-shadow-hard-small-vertical" />
          </div>
        </div>

        {/* Instructions */}
        <div className="p-8 lg:p-16 relative z-[2] bg-white">
          <div className="mx-auto container flex flex-col lg:flex-row lg:space-x-8">
            <div className="lg:w-2/5">
              <div className="mb-8 mx-auto md:w-1/2 lg:w-full anchor" id="adding-bech32m">
                <Image
                  src={bunnyHacker}
                  alt="Bunny hacking on bitcoin at its laptop"
                  width="948"
                  height="784"
                  layout="responsive"
                  placeholder="blur"
                />
              </div>
            </div>
            
            <div className="lg:w-3/5">
              <h2>Adding Bech32m send support</h2>

              <p>
                <a href="https://bips.xyz/173">Bech32</a> and <a href="https://bips.xyz/350">Bech32m</a> addresses differ
                only in their checksums. This simple <a href="https://github.com/jesseposner/bech32/commit/cc1cc2cc501f7da51305cbf43eef3f6258892cdb#diff-f226c2590ba87b0b57a874d7eecacac232f0d39a7896c08cf6167c258b0b31a1L132-L143">two-line code change</a> adds
                Bech32m address decoding support to the <a href="https://github.com/sipa/bech32/">Bech32 Python reference implementation</a>.
              </p>
              <div className="my-8">
                <Image
                  src={bech32mCodeDiff}
                  alt="Code changes for adding Bech32m sending support"
                  width="2560"
                  height="2773"
                  layout="responsive"
                  className="my-8"
                  quality="90"
                />
              </div>

              <p>
                You're almost there. Next, check whether your frontend interface accepts Bech32m addresses. Finally, make
                sure your transaction building process creates outputs with witness version 1. Otherwise,
                you're <strong>burning bitcoin.</strong>
              </p>
            </div>
          </div>
        </div>
        
        {/* Benefits */}
        <div className="relative z-[3] bg-white">
          <img src="curve-2.svg" alt="" className="w-full translate-y-1" />
          <div className="bg-blue-gray">
            <div className="mx-auto container p-8 md:py-16 flex flex-col lg:flex-row lg:space-x-8">
              <div className="lg:w-2/5">
                <div className="mb-8 mx-auto md:w-1/2 lg:w-full anchor" id="creating-p2tr-outputs">
                  <Image
                    src={carrotsGrowing}
                    alt="Carrots growing into the ground"
                    width="1000"
                    height="846"
                    layout="responsive"
                    placeholder="blur"
                  />
                </div>
              </div>
              <div className="lg:w-3/5">
                <h2>Creating P2TR outputs: supporting Bech32m</h2>
                <div className="space-y-4">
                  <h3>A little work. A lot more benefit</h3>
                  <p>
                    It won't be long before users take it for granted that Taproot works. Therefore, at a minimum, wallets
                    and services should properly handle Bech32m addresses to prevent funds from being burned. Implementing
                    sending support is simpler than it sounds, requiring only a bit more work than not supporting it.
                  </p>
                  <h3>Reduce support costs</h3>
                  <p>
                    With P2TR for Lightning already in the works, and other wallets moving towards P2TR, broader Bech32m
                    wallet support is almost inevitable. This means that services not supporting sending to Bech32m when
                    their customers attempt to transfer funds could face trouble at the support level. Integrating Bech32m
                    today avoids the problem your customers will be facing.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <img src="curve-2.svg" alt="" className="w-full rotate-180 -translate-y-1" />
        </div>

        {/* Features */}
        <div className="p-8 relative z-[2] bg-white">
          <div className="mx-auto container flex flex-col lg:flex-row lg:space-x-8">
            <div className="lg:w-2/5">
              <div className="mx-auto md:w-1/2 lg:w-full anchor" id="features">
                <Image
                  src={bunnyAstronaut}
                  alt="Bunny hacking on bitcoin at its laptop"
                  width="1172"
                  height="877"
                  layout="responsive"
                  placeholder="blur"
                />
              </div>
            </div>
            <div className="lg:w-3/5">
              <h2 className="font-display my-8">
                Every day without P2TR adoption is a day without these and other great benefits
              </h2>
              <div className="space-y-12 lg:flex lg:flex-wrap lg:space-y-0">
                <div className="basis-1/2 lg:odd:pr-4 lg:even:pl-4 lg:pb-8">
                  <h3 className="">Lighter, More Private Multisig</h3>
                  <p>
                    Key aggregation provides multi-sig security with the same look and footprint as single-sig. P2TR
                    channels make lightning channel closes indistinguishable from other keypath spends.
                  </p>
                </div>
                <div className="basis-1/2 lg:odd:pr-4 lg:even:pl-4 lg:pb-8">
                  <h3 className="">$ Inputs, $$$ Outputs</h3>
                  <p>
                    Pay-to-Taproot (P2TR) better aligns incentives, making it cheaper to spend stacked sats at the cost of
                    slightly more expensive outputs.
                  </p>
                </div>
                <div className="basis-1/2 lg:odd:pr-4 lg:even:pl-4 lg:pb-8">
                  <h3 className="">Versatile Single-sig</h3>
                  <p>
                    Add powerful fallback spending conditions to single-sig outputs in the Taptree.
                  </p>
                </div>
                <div className="basis-1/2 lg:odd:pr-4 lg:even:pl-4 lg:pb-8">
                  <h3 className="">FROST Threshold Signatures</h3>
                  <p>
                    Multisig or <a href="https://eprint.iacr.org/2020/852.pdf">FROST</a> can enable Lightning channel owners to use multiple signing devices under the hood.
                  </p>
                </div>
                <div className="basis-1/2 lg:odd:pr-4 lg:even:pl-4 lg:pb-8">
                  <h3 className="">Replace Lost Keys with FROST</h3>
                  <p>
                    FROST makes it possible for users to lose and then replace a key without a wallet sweep or incurring the
                    associated fees of an on-chain transaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Support table */}
        <div className="relative z-[3] bg-white">
          <img src="curve-2.svg" alt="" className="w-full translate-y-1 -scale-x-100" />
          <div className="bg-blue-gray">
            <div className="mx-auto container p-8 md:py-16">
              <h2 className="text-center md:text-4xl xl:text-5xl 2xl:text-6xl" id="support">
                The state of taproot support
              </h2>

              <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0">
                <div className="lg:order-last lg:basis-1/2 lg:pl-4">
                  <h3 className="flex flex-row items-center mb-4 space-x-4 w-full justify-center">
                    <CrossIcon className="w-6 h-6" />
                    <span>Does not support sending to Bech32m</span>
                  </h3>
                  <PillBox metric="bech32m_sends_no" />
                </div>
                <div className="lg:basis-1/2 lg:pr-4">
                  <h3 className="flex flex-row items-center mb-4 space-x-4 w-full justify-center">
                    <CheckIcon className="w-6 h-6" />
                    <span>Supports sending to Bech32m</span>
                  </h3>
                  <PillBox metric="bech32m_sends_yes" />
                </div>
              </div>
            </div>
          </div>
          <img src="curve-2.svg" alt="" className="w-full rotate-180 -translate-y-1 -scale-x-100" />
        </div>
        
        {/* Get Involved */}
        <div className="p-8 relative z-[2] bg-white">
          <div className="mx-auto container flex flex-col lg:flex-row lg:space-x-8">
            <div className="lg:w-2/5">
              <div className="mx-auto mb-8 md:w-1/2 lg:w-full anchor" id="get-involved">
                <Image
                  src={bunniesGetInvolved}
                  alt="Two bunnies testing bitcoin wallets on their phones"
                  width="1602"
                  height="960"
                  layout="responsive"
                  placeholder="blur"
                />
              </div>
            </div>
            <div className="lg:w-3/5">
              <h2>Get Involved</h2>

              <p>
                Help push the industry forward by testing wallets and other services for Bech32m and P2TR support. Just
                follow these steps.
              </p>

              <ol className="list-decimal space-y-8 marker:font-display marker:text-2xl px-4 my-8">
                <li className="pl-4">
                  Select an untested wallet, exchange, or other bitcoin service from the above list.
                </li>
                <li className="pl-4">
                  Generate a Bech32m address (which begins with <code>bc1p</code>) from any wallet that supports it. If you don't
                  already have one, download Muun. Then, send a small amount of bitcoin from the wallet you are testing
                  to your Bech32m address. Please use an appropriately small amount, since on at least two occasions,
                  incorrect implementation of Bech32m support caused lost funds. You can also use <a href="#sample-address" onClick={toggleSample}>this sample address</a>,
                  but you won’t get the bitcoin back.
                </li>
                <li className="pl-4">
                  To test receiving, select your bitcoin service’s "receive" or "deposit" feature. If the address begins
                  with "bc1p," then this software already supports receiving P2TR outputs. You may also want to dig
                  around its settings for a "Taproot" option as they may support it but not as the default receive
                  method.
                </li>
                <li className="pl-4">
                  Once you've finished your test, send us the results
                  by <a href="https://github.com/sbddesign/bech32m-adoption/issues">opening an issue</a>,
                  opening a PR to edit the website, or mentioning it to us on <a href="https://bitcoindesign.slack.com/archives/C03ND8N72PL">Slack</a>.
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Sample address modal */}
        <div>
          <div className={(sampleActive ? 'opacity-25' : 'opacity-0 hidden') + " fixed top-0 left-0 w-full h-full bg-black z-[10] cursor-pointer transition-opacity duration-500"} onClick={toggleSample}></div>
          <div className={(sampleActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-80 pointer-events-none') + " fixed p-8 top-0 left-0 w-full h-full md:w-auto md:h-auto md:top-1/2 md:left-1/2 md:right-1/2 md:bottom-1/2 z-[11] flex items-center justify-center transition-all duration-500"}>
            <div className="bg-white rounded-xl text-center flex flex-col space-y-4 drop-shadow-hard-small w-full md:w-auto">
              <div className="p-4 border-b solid border-slate-400 flex items-center justify-between">
                <h3>Sample Address</h3>
                <button title="Close sample address window" onClick={toggleSample}>
                  <CrossIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="w-full max-w-[200px] mx-auto block">
                <Image
                  src={bech32mQr}
                  alt="A QR code of a Bech32m bitcoin address"
                  width="164"
                  height="164"
                  layout="responsive"
                  placeholder="blur"
                />
              </div>
              <div className="flex flex-row justify-center p-4">
                <input type="text" className="text-xs font-mono p-4 border solid rounded-md w-80" value={sampleAddress} id="sample-address" readOnly />
                <button title="Copy Sample Address" className="p-2" onClick={copyAddress}>
                  <CopyIcon className="w-8 h-8" />
                </button>
              </div>
          </div>
          </div>
        </div>

        {/* Terminology */}
        <div className="p-8 md:px-8 md:pb-16 md:pt-8 relative z-[2] bg-white">
          <div className="mx-auto container max-w-3xl bg-blue-gray px-8 py-8 md:p-24 rounded-2xl md:rounded-tl-[12rem] md:rounded-tr-[4rem] md:rounded-br-[12rem] md:rounded-bl-[4rem]">
            <h2 id="terminology">Terminology</h2>
            <ul className="list-disc space-y-4">
              <li><a href="https://bitcoinops.org/en/topics/taproot/">Taproot</a> - This is a soft fork change to bitcoin that went into effect in November 2021.</li>
              <li>P2TR (Pay-to-Taproot) - This is a new transaction output type which was introduced by Taproot.</li>
              <li><a href="https://bitcoinops.org/en/topics/bech32/">Bech32m</a> - This is an address encoding format. A prospective sender must be able to decode a Bech32m address to create a P2TR output.</li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="relative">
          <div className="w-full relative z-[2] drop-shadow-hard-small-vertical-down overflow-x-hidden">
            <img src="curve-1.svg" width="1728" height="148" className="w-full h-auto rotate-180 -translate-y-1" />
          </div>
          <div className="px-4 pt-16 pb-16 lg:pt-8 flex items-center justify-center lg:min-h-[50vh]">
            <div className="bg-white px-8 py-12 rounded-3xl drop-shadow-hard-small max-w-2xl relative z-[2]">
              <h2 className="" id="contact">Join the discussion</h2>

              <ul className="text-xl space-y-8 text-center md:flex items-center justify-center md:space-y-0 md:space-x-16 lg:text-2xl">
                <li>
                  <a href="https://bitcoindesign.slack.com/archives/C03ND8N72PL" className="flex items-center justify-center space-x-4">
                    <FontAwesomeIcon icon={faSlack} className="w-8 h-8" />
                    <span>Slack <span className="sr-only xl:not-sr-only">Channel</span></span>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/WhenTaproot" className="flex items-center justify-center space-x-4">
                    <FontAwesomeIcon icon={faTwitter} className="w-8 h-8" />
                    <span>Twitter</span>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/sbddesign/bech32m-adoption" className="flex items-center justify-center space-x-4">
                    <FontAwesomeIcon icon={faGithub} className="w-8 h-8" />
                    <span>GitHub</span>
                  </a>
                </li>
              </ul>
              
              <h3 className="my-4 md:mt-8">Project Contributors</h3>
              
              <ul className="flex flex-row flex-wrap">
                {sortedContribs.map((contrib, key)=>(
                  <li className="after:content-[','] last:after:content-none mr-2">
                    {contrib.link ? <a href={contrib.link}>{contrib.name}</a> : contrib.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
