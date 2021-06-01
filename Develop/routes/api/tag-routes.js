const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [Product],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  console.log("we're hitting tag routes!")
  try {
    const singleTagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    })

    if(!singleTagData) {
      res.json(404).json({message: 'No tag found with this ID!'})
      return;
    }

    res.status(200).json(singleTagData)
  } catch (err) {
    res.status(500).json(err)
  }
});

  router.post('/', async (req, res) => {
    try {
      const tagData = await Tag.create({
        tag_name: req.body.tag_name
      });
      res.status(200).json({ message: 'Tag created.' }
        );
    } catch (err) {
      res.status(400).json(err)
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const tagData = await Tag.update(req.body, {
        where: {
          id: req.params.id
        }
      });
      if(!tagData) {
        res.status(404).json({ message:'No tag found with that ID.' });
        return
      };
      res.status(200).json({ message:'Tag updated.' });
    } catch (err) {
      res.status(500).json(err)
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const tagData = await Tag.destroy({
        where: {
          id: req.params.id
        }
      });
      if(!tagData) {
        res.status(404).json({ message:'No tag found with that ID.' });
        return
      };
      res.status(200).json({ message:'Tag deleted.' });
    } catch (err) {
      res.status(500).json(err)
    }
  });

module.exports = router;
