const express = require("express");
const db = require("../data/dataconfig");
const router = express.Router();

router.get("/", (req, res) => {
    
    db("cars")
        .then(cars => {
            res.status(200).json({ data: cars });
        })
        .catch(err => {
            handleError(err, res);
        });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;

    db("cars")
        .where({ id })
        .first()
        .then(car => {
            res.status(200).json({ data: car});
        })
        .catch(err => {
            handleError(err, res);
        });
});

router.post("/", (req, res) => {
    const carinfo = req.body;

    db("cars")
        .insert(carinfo, "id")
        .then(id => {
            db("cars")
                .where({ id: id[0] })
                .first()
                .then(car => {
                    res.status(200).json({ data: car });
                });
        })
        .catch(err => {
            handleError(err, res);
        });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const update = req.body;

    db("cars")
        .where({ id })
        .update(update) 
        .then(count => {
            if (count > 0) {
                res.status(200).json({ data: count });
            } else {
                res.status(404).json({ message: "there was no record to update" });
            }
        })
        .catch(err => {
            handleError(err, res);
        });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db("cars")
        .where({ id })
        .del()
        .then(count => {
            if (count > 0) {
                res.status(200).json({ data: count });
            } else {
                res.status(404).json({ message: "there was no record to delete" });
            }
        })
        .catch(err => {
            handleError(err, res);
        });
});

function handleError(err, res) {
    console.log("error", err);
    res.status(500).json({ message: err.message });
}


module.exports = router;