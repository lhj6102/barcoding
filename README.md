# Barcoding

Encode chart data to barcode to lower size. Data has three type: identifier, sortable, filterable

```js
// rawData
[
  {
    identifier: {id: 1, name:"Terry"},
    sortable: {
        info: {
            age: 22, height:179
        },
        score: {
            math: 98, science: 88
        }
    },
    filterable: {
      inBag: ["book", "pencil", "pen", "ruler"],
      subscribes: ["MrBeast", "BTS"]
    }
  },
...
]

// encodedData
keys: {
    sortable: {
        info: ["age", "height"],
        score: ["math", "science"]
    },
    filterable: {
        inBag: ["book", "pencil", "pen", "ruler"],
        subscribes: ["MrBeast", "BTS"]
    }
}
enData: [
    {
        identifier: {id: 1, name:"Terry"},
        sortable: {
            info: [22, 179],
            score: [98, 88]
        },
        filterable: {
            inBag: [11], // "1111"
            subscribes: [3], // "11"
        }
    }
]
```

Can filter and sort before decode.

## Installation

```bash
npm install barcoding
```
