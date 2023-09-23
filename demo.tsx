const [signature, setSignature] = useState();

onClick = { async() => {
    const sig = await connection.account.signMessage({
        domain: {
            name: "Whack a mole",
            chainId: connection.chainId,
            version: "0.0.1",
        },
        types: {
            StarkNetDomain: [
                { name: "name", type: "felt" },
                { name: "chainId", type: "felt" },
                { name: "version", type: "felt" },
            ],
            Message: [{ name: "message", type: "felt" }],
        },
        primaryType: "Message",
        message: {
            message: "Hello world",
        },
    });

    setSignature(sig);
    console.log(sig);
}}



"0x568b84dfc5be9c18c4458f1ea0d53288be4135909ec10e980b0b273f5730f36"
"0x4e1117b0bc319d12424c5e2caa508dd3a029ba53416c6ac88068ed44e1d576b"