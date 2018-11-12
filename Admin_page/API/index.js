const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const Crypto = require("crypto");

const url = "mongodb://yusriyunus_:qwerty97@ds223253.mlab.com:23253/agristore";

var app = express();
var port = 2018;

app.use(cors());
app.use(bodyParser.json());

app.post("/login", (req, res) => {
  var { email, password } = req.body;
  var passwordEncripted = Crypto.createHmac("sha256", "qwerty1234")
    .update(password)
    .digest("hex");

  MongoClient.connect(
    url,
    (err, db) => {
      userCol = db.collection("admin");
      userCol
        .find({ $and: [{ email }, { password: passwordEncripted }] })
        .toArray((err1, docs) => {
          if (err1) console.log(err1);

          res.send(docs);
        });
    }
  );
});

app.post("/keeplogin", (req, res) => {
  var { email } = req.body;

  MongoClient.connect(
    url,
    (err, db) => {
      userCol = db.collection("admin");
      userCol.find({ email }).toArray((err1, docs) => {
        if (err1) console.log(err1);

        res.send(docs);
      });
    }
  );
});

app.post("/register", (req, res) => {
  var { username, email, password } = req.body;
  MongoClient.connect(
    url,
    (err, db) => {
      userCol = db.collection("admin");
      userCol.find({ $or: [{ username }, { email }] }).toArray((err1, docs) => {
        if (err1) console.log(err1);

        if (docs.length > 0) {
          db.close();
          res.send({ err: "Username or Email have already exist!" });
        } else {
          var passwordEncripted = Crypto.createHmac("sha256", "qwerty1234")
            .update(password)
            .digest("hex");

          userCol.insert(
            {
              username,
              email,
              password: passwordEncripted
            },
            (err2, result) => {
              db.close();
              res.send({ err: "", user: result.ops[0] });
            }
          );
        }
      });
    }
  );
});

app.post("/getproduct", (req, res) => {
  const { product } = req.body;
  MongoClient.connect(
    url,
    (err, db) => {
      productCol = db.collection(product);
      productCol.find().toArray((err1, docs) => {
        if (err1) console.log(err1);
        res.send(docs);
      });
    }
  );
});

app.post("/deleteproduct", (req, res) => {
  const { _id, category } = req.body;
  MongoClient.connect(
    url,
    (err, db) => {
      if (err) console.log(err);
      productCol = db.collection(category);
      productCol.remove(
        {
          _id: mongodb.ObjectId(_id)
        },
        function(err1, docs) {
          if (err1) console.log(err1);
        }
      );
      productCol.find().toArray((err2, docs1) => {
        if (err2) console.log(err2);
        res.send(docs1);
      });
    }
  );
});

app.post("/updateproduct", (req, res) => {
  const {
    _id,
    category,
    nama,
    price,
    stokAwal,
    stokTersedia,
    lokasiPengirim,
    promosi
  } = req.body;
  MongoClient.connect(
    url,
    (err, db) => {
      productCol = db.collection(category);
      productCol.update(
        {
          _id: mongodb.ObjectId(_id)
        },
        {
          $set: {
            category,
            nama,
            price,
            stokAwal,
            stokTersedia,
            lokasiPengirim,
            promosi
          }
        }
      );
      productCol.find().toArray((err1, docs1) => {
        if (err1) console.log(err1);
        res.send(docs1);
      });
    }
  );
});

app.post("/addproduct", (req, res) => {
  const {
    category,
    nama,
    price,
    stokAwal,
    stokTersedia,
    lokasiPengirim,
    promosi
  } = req.body;
  MongoClient.connect(
    url,
    (err, db) => {
      productCol = db.collection(category);
      productCol.insert({
        category,
        nama,
        price,
        stokAwal,
        stokTersedia,
        lokasiPengirim,
        promosi,
        userResponds: [],
        rating: [],
        totalRate: null
      });
      productCol.find().toArray((err1, docs) => {
        if (err1) console.log(err1);
        res.send(docs);
      });
    }
  );
});

app.get("/gettransaction", (req, res) => {
  MongoClient.connect(
    url,
    (err, db) => {
      transactionCol = db.collection("transaction");
      transactionCol.find().toArray((err1, docs) => {
        if (err1) console.log(err1);
        res.send(docs);
      });
    }
  );
});

app.listen(port, () => console.log(`API active on port ${port}`));
