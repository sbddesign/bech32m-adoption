import Head from 'next/head'
import { faTwitter, faGithub, faSlack } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SupportTable from '../components/support-table';
import {CopyIcon, CrossIcon, MenuIcon} from '@bitcoin-design/bitcoin-icons-react/filled';
import React from 'react';
import Image from 'next/image'
import backgroundImg from "../public/background.png"
import bunnyCrying from "../public/crying@0.5x.png"
import carrot from "../public/carrot@0.5x.png"
import bunnyHacker from "../public/bunny-hacker.png"
import bech32mCodeDiff from "../public/bech32m-code-diff.png"

export default function Home() {
  const sampleAddress = "bc1pmnhwnlcx7w4lfv3txuez6hfup24wkr4yygzugekpmttplx2mnkusw03aln"
  
  const [menuOpen, setMenuOpen] = React.useState(false)
  
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen)
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
    
    let supportTable = document.querySelector('#support-container table')
    let supportTableHead = supportTable.querySelector('thead')
    let header = document.getElementById('header')
    
    if(window.scrollY > (supportTable.offsetTop - header.scrollHeight) && window.scrollY < (supportTable.offsetTop + supportTable.scrollHeight)) {
      let diff = window.scrollY - supportTable.offsetTop
      
      supportTableHead.style.top = (diff + header.scrollHeight) + 'px'
      
    }
    else {
      supportTableHead.style.top = '0'
    }
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

  React.useEffect(()=>{
    checkScrollPosition()
    window.addEventListener('scroll', checkScrollPosition)
  })
  
  const siteNav = [
    {
      uri: "/#intro",
      text: "Home"
    },
    {
      uri: "/#creating-p2tr-outputs",
      text: "Creating P2TR Outputs"
    },
    {
      uri: "/#adding-bech32m",
      text: "Adding Bech32m support"
    },
    {
      uri: "/#features",
      text: "Benefits of taproot"
    },
    {
      uri: "/#get-involved",
      text: "Get involved"
    },
    {
      uri: "/#support",
      text: "State of taproot support"
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
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 sm:pb-32 md:p-16 md:pb-32 xl:pt-24 relative z-[2]">
          <div className="bg-white p-8 rounded-3xl drop-shadow-hard-small max-w-2xl">
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
            <p className="text-xl xl:text-2xl mb-8">
              Taproot offers bitcoin users and businesses big benefits. But to unlock them, first we need wallet
              interoperability. Taproot requires Bech32m, a new address format, which is slightly different from Bech32.
              This means that Taproot adoption will only take off when wallets support sending to this new format.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-full z-[2] overflow-hidden">
            <img src="curve-1.svg" width="1728" height="148" className="w-full h-auto translate-y-1 scale-[1.2] drop-shadow-hard-small-vertical" />
          </div>
        </div>

        {/* Instructions */}
        <div className="p-8 pb-0 relative z-[2] bg-white">
          <div className="mx-auto container flex flex-col">
            <div>
              <div className="mb-8">
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
            
            <div>
              <h2 id="adding-bech32m">Adding Bech32m send support</h2>

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
        <div className="p-8 relative z-[2] bg-white">
          <div className="mx-auto container">
            <h2 className="text-center text-4xl" id="creating-p2tr-outputs">Creating P2TR outputs: supporting Bech32m</h2>
            <div className="space-y-8 md:flex md:flex-wrap md:space-y-0">
              <div className="md:basis-1/2 md:p-8">
                <div className="w-32 h-32 bg-slate-400 rounded-full mx-auto mb-4"></div>
                <h3 className="mb-4 text-center">A little work. A lot more benefit</h3>
                <p>
                  It won't be long before users take it for granted that Taproot works. Therefore, at a minimum, wallets
                  and services should properly handle Bech32m addresses to prevent funds from being burned. Implementing
                  sending support is simpler than it sounds, requiring only a bit more work than not supporting it.
                </p>
              </div>
              <div className="md:basis-1/2 md:p-8">
                <div className="w-32 h-32 bg-slate-400 rounded-full mx-auto mb-4"></div>
                <h3 className="mb-4 text-center">Reduce support costs</h3>
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
        
        

        {/* Features */}
        <div className="p-8 pt-0 relative z-[2] bg-white">
          <div className="mx-auto container">
            <h2 className="font-display mb-4 mt-16 text-2xl text-center max-w-3xl mx-auto md:text-3xl lg:text-4xl" id="features">
              Every day without P2TR adoption is a day without these and other great benefits
            </h2>
            <div className="space-y-8 md:flex md:flex-wrap md:space-y-0">
              <div className="md:basis-1/2 md:p-8 xl:basis-1/3">
                <div className="w-32 h-32 bg-slate-400 rounded-full mx-auto mb-4"></div>
                <h3 className="mb-4 text-center">Lighter, More Private Multisig</h3>
                <p>
                  Key aggregation provides multi-sig security with the same look and footprint as single-sig. P2TR
                  channels make lightning channel closes indistinguishable from other keypath spends.
                </p>
              </div>
              <div className="md:basis-1/2 md:p-8 xl:basis-1/3">
                <div className="w-32 h-32 bg-slate-400 rounded-full mx-auto mb-4"></div>
                <h3 className="mb-4 text-center">$ Inputs, $$$ Outputs</h3>
                <p>
                  Pay-to-Taproot (P2TR) better aligns incentives, making it cheaper to spend stacked sats at the cost of
                  slightly more expensive outputs.
                </p>
              </div>
              <div className="md:basis-1/2 md:p-8 xl:basis-1/3">
                <div className="w-32 h-32 bg-slate-400 rounded-full mx-auto mb-4"></div>
                <h3 className="mb-4 text-center">Versatile Single-sig</h3>
                <p>
                  Add powerful fallback spending conditions to single-sig outputs in the Taptree.
                </p>
              </div>
              <div className="hidden xl:block xl:basis-1/5"></div>
              <div className="md:basis-1/2 md:p-8 xl:basis-1/3">
                <div className="w-32 h-32 bg-slate-400 rounded-full mx-auto mb-4"></div>
                <h3 className="mb-4 text-center">FROST Threshold Signatures</h3>
                <p>
                  Multisig or FROST can enable Lightning channel owners to use multiple signing devices under the hood.
                </p>
              </div>
              <div className="md:basis-1/2 md:p-8 xl:basis-1/3">
                <div className="w-32 h-32 bg-slate-400 rounded-full mx-auto mb-4"></div>
                <h3 className="mb-4 text-center">Replace Lost Keys with FROST</h3>
                <p>
                  FROST makes it possible for users to lose and then replace a key without a wallet sweep or incurring the
                  associated fees of an on-chain transaction.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Get Involved */}
        <div className="p-8  relative z-[2] bg-white">
          <div className="mx-auto container max-w-[1600px] flex flex-col lg:flex-row">
            <div className="lg:basis-3/5 lg:w-3/5">
              <h2 id="get-involved">Get Involved</h2>

              <p>
                Help push the industry forward by testing wallets and other services for Bech32m and P2TR support. Just
                follow these steps.
              </p>

              <ol className="list-decimal space-y-8 marker:font-display marker:text-2xl px-4 my-8">
                <li className="pl-4">
                  Select an untested wallet, exchange, or other bitcoin service from the above list.
                </li>
                <li className="pl-4">
                  Generate a Bech32m address (which begins with `bc1p`) from any wallet that supports it. If you don't
                  already have one, download <a href="https://muun.com/">Muun</a>. Then, send a small amount of bitcoin
                  from the wallet you are testing to your Bech32m address. Please use an appropriately small amount,
                  since on at least two occasions, incorrect implementation of Bech32m support caused lost funds.
                </li>
                <li className="pl-4">
                  To test receiving, select your bitcoin service’s "receive" or "deposit" feature. If the address begins
                  with "bc1p," then this software already supports receiving P2TR outputs. You may also want to dig around
                  its settings for a "Taproot" option as they may support it but not as the default receive method.
                </li>
                <li className="pl-4">
                  Once you've finished your test, send us the results
                  by <a href="https://github.com/sbddesign/bech32m-adoption/issues">opening an issue</a>,
                  opening a PR to edit the website, or mentioning it to us on Slack.
                </li>
              </ol>
            </div>
            <div className="pb-8 lg:basis-2/5 lg:w-2/5 text-center pl-8">
              <h3>Sample Address</h3>
              <img src="bech32m-qr.png" alt="A QR code of a Bech32m bitcoin address" className="w-80 mx-auto block" />
              <div className="flex flex-row justify-center">
                <input type="text" className="text-xs font-mono p-4 border solid rounded-md w-80" value={sampleAddress} id="sample-address" readOnly />
                <button title="Copy Sample Address" className="p-2" onClick={copyAddress}>
                  <CopyIcon className="w-8 h-8" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Support table */}
        <div className="mx-auto p-8 relative z-[2] bg-white">
          <h2 className="text-center md:text-4xl xl:text-5xl 2xl:text-6xl" id="support">
            The state of taproot support
          </h2>
          
          <div id="support-container" className="w-full">
            <SupportTable />
          </div>
        </div>

        {/* Terminology */}
        <div className="p-8 md:px-8 md:pb-16 md:pt-8 relative z-[2] bg-white">
          <div className="mx-auto container max-w-3xl">
            <h2 id="terminology">Terminology</h2>
            <ul className="list-disc space-y-4">
              <li><a href="https://bitcoinops.org/en/topics/taproot/">Taproot</a> - This is a soft fork change to bitcoin that went into effect in November 2021.</li>
              <li>P2TR (Pay-to-Taproot) - This is a new transaction output type which was introduced by Taproot.</li>
              <li><a href="https://bitcoinops.org/en/topics/bech32/">Bech32m</a> - This is an address encoding format. A prospective sender must be able to decode a Bech32m address to create a P2TR output.</li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="mx-auto wtr-bg px-4 py-16 sm:pt-24 flex items-center justify-center lg:min-h-[50vh] relative">
          <div className="absolute top-0 left-0 w-full z-[2] drop-shadow-hard-small-vertical-down overflow-x-hidden">
            <img src="curve-1.svg" width="1728" height="148" className="w-full h-auto rotate-180 scale-x-[1.2] -translate-y-1" />
          </div>
          
          <div className="bg-white px-8 py-12 rounded-3xl drop-shadow-hard-small max-w-2xl relative z-[2]">
            <div className="footer-img md:w-2/5 mx-auto">
              <svg width="338" height="315" viewBox="0 0 338 315" fill="none" role="img" xmlns="http://www.w3.org/2000/svg">
                <title>Bunny happily eating a carrot</title>
                <path d="M52.4332 165.08C60.3027 126.355 79.1868 110.676 99.5938 105.913C124.86 100.016 138.853 102.899 158.533 121.361C200.06 160.322 187.124 235.09 132.706 247.79C78.2869 260.491 44.5636 203.806 52.4332 165.08Z" fill="#C8E8F2"/>
                <path d="M123.068 183.859C121.025 186.235 117.68 187.016 114.797 185.79V185.79C108.391 183.067 109.198 173.741 115.977 172.16V172.16C122.755 170.578 127.606 178.582 123.068 183.859V183.859Z" fill="#7B6C63"/>
                <ellipse rx="10.2282" ry="13.2219" transform="matrix(-0.99951 -0.0313119 -0.0313119 0.99951 131.458 147.091)" fill="#7B6C63"/>
                <circle cx="134.213" cy="141.638" r="3.74204" transform="rotate(-13.1367 134.213 141.638)" fill="white"/>
                <circle cx="137.558" cy="148.287" r="1.49682" transform="rotate(-13.1367 137.558 148.287)" fill="white"/>
                <ellipse cx="91.1292" cy="156.503" rx="10.2282" ry="13.2219" transform="rotate(-28.0678 91.1292 156.503)" fill="#7B6C63"/>
                <circle r="3.74204" transform="matrix(-0.97383 0.227276 0.227276 0.97383 86.2435 152.834)" fill="white"/>
                <circle r="1.49682" transform="matrix(-0.97383 0.227276 0.227276 0.97383 86.1872 160.276)" fill="white"/>
                <path d="M97.4808 196.915C96.1597 195.915 94.2782 196.176 93.2782 197.497C92.2783 198.818 92.5387 200.7 93.8598 201.699L97.4808 196.915ZM116.053 185.779C116.268 186.836 116.411 189.203 116.102 191.944C115.794 194.684 115.078 197.405 113.86 199.365C112.714 201.208 111.252 202.231 109.144 202.266C106.774 202.305 103.028 201.113 97.4808 196.915L93.8598 201.699C99.825 206.214 104.897 208.337 109.243 208.265C113.85 208.189 117.001 205.676 118.956 202.532C120.837 199.505 121.708 195.788 122.065 192.614C122.422 189.44 122.306 186.416 121.932 184.58L116.053 185.779Z" fill="#7B6C63"/>
                <path d="M144.198 187.415C145.191 186.09 147.072 185.82 148.398 186.814C149.723 187.808 149.993 189.688 148.999 191.014L144.198 187.415ZM122.136 184.358C122.432 185.482 123.22 187.505 124.483 189.581C125.753 191.669 127.35 193.556 129.147 194.69C130.841 195.758 132.7 196.168 134.919 195.436C137.291 194.654 140.427 192.447 144.198 187.415L148.999 191.014C144.859 196.538 140.807 199.812 136.799 201.134C132.639 202.507 128.929 201.645 125.947 199.765C123.069 197.95 120.886 195.214 119.357 192.7C117.82 190.174 116.79 187.618 116.334 185.886L122.136 184.358Z" fill="#7B6C63"/>
                <path d="M22.425 36.0697C53.9704 15.6431 79.3216 82.9992 88.054 119.231L76.7431 127.09C45.4931 105.261 -9.12045 56.4964 22.425 36.0697Z" fill="#C8E8F2"/>
                <path d="M34.5387 48.7496C51.0052 36.1587 71.3802 79.9462 80.7022 106.591C81.4732 108.795 80.6359 111.216 78.7035 112.526C76.8199 113.803 74.3346 113.727 72.5739 112.285C51.3673 94.9211 18.0707 61.3416 34.5387 48.7496Z" fill="#F1D0CC"/>
                <path d="M139.733 8.69235C102.405 4.33971 109.488 75.9593 117.696 112.313L131.317 114.353C149.676 80.9466 177.062 13.045 139.733 8.69235Z" fill="#C8E8F2"/>
                <path d="M134.485 25.4247C114.146 21.4236 115.259 69.7065 118.694 97.7254C118.978 100.043 120.801 101.843 123.114 102.162C125.368 102.474 127.562 101.305 128.503 99.2328C139.833 74.2755 154.825 29.4262 134.485 25.4247Z" fill="#F1D0CC"/>
                <path d="M280.092 142.126C267.983 151.067 264.193 166.249 263.812 172.722L269.108 176.966C269.47 175.276 272.57 168.819 282.07 156.507C291.57 144.196 310.168 144.674 318.279 146.453C310.596 141.285 292.201 133.185 280.092 142.126Z" fill="#469264"/>
                <path d="M295.886 178.487C288.258 170.154 271 175.493 262.723 179.06L259.575 172.214C263.824 168.517 283.901 155.03 298.922 170.343C308.428 180.035 306.227 193.589 295.66 201.133C298.736 198.936 303.693 187.015 295.886 178.487Z" fill="#23B25C"/>
                <path d="M305.872 167.218C295.83 158.069 277.285 170.362 269.268 177.653L263.011 171.099C266.398 165.234 283.958 142.049 307.024 153.592C321.622 160.896 320.865 181.498 310.503 189.756C313.143 186.055 315.913 176.367 305.872 167.218Z" fill="#209B51"/>
                <path d="M251.065 141.093C260.508 145.272 257.644 161.94 255.032 169.752L261.508 172.093C264.549 167.939 275.29 148.617 260.189 136.114C250.632 128.2 236.536 135.044 233.97 144.783C235.734 141.812 241.623 136.915 251.065 141.093Z" fill="#209B51"/>
                <path d="M264.786 133.621C274.77 142.834 264.126 162.373 257.556 170.991L264.626 176.657C270.177 172.775 291.756 153.277 278.262 131.295C269.722 117.384 249.264 119.919 241.933 130.956C245.391 128.006 254.803 124.409 264.786 133.621Z" fill="#23B25C"/>
                <path d="M265.163 170.524C250.869 159.069 225.826 168.867 214.61 184.785C212.722 187.464 209.986 191.83 206.795 197.265C212.385 200.456 220.799 207.902 209.737 212.157C214.346 215.348 221.119 223.539 211.332 230.772C213.283 236.445 213.779 246.302 200.164 240.345C198.72 246.373 193.447 254.918 183.904 240.877C174.929 260.268 168.803 277.818 173.276 281.402C182.959 289.162 249.203 236.74 261.489 222.354C273.775 207.968 279.458 181.98 265.163 170.524Z" fill="#F76421"/>
                <path d="M213.347 258.489C190.053 274.957 179.431 278.342 176.17 278.421C197.1 264.904 228.068 239.491 247.16 215.667C262.188 196.916 265.081 183.752 265.714 174.247C274.688 184.468 268.332 206.888 260.756 216.971C253.18 227.054 242.465 237.904 213.347 258.489Z" fill="#D5622D"/>
                <path d="M244.929 173.201C241.372 171.069 228.833 177.34 230.844 181.489C232.856 185.638 253.432 178.299 244.929 173.201Z" fill="#FF7B3F"/>
                <path d="M226.474 181.741C224.269 181.298 219.006 186.78 220.787 188.533C222.569 190.286 231.742 182.798 226.474 181.741Z" fill="#FF7B3F"/>
                <path d="M177.5 216.5L174 208L182.5 210.5L177.5 216.5Z" fill="#F76421"/>
                <path d="M176 229V222L180.5 223L178.5 228.5L176 229Z" fill="#F76421"/>
              </svg>
            </div>
        
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl" id="contact">Join the discussion</h2>
        
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
          </div>
        </div>
      </main>
    </div>
  )
}
