import Site from '../models/Site.js';

const getAll = async (req, res) => {
  try {
    const sites = await Site.find();
    return res.json(sites);
  } catch (err) {
    return res.status(500).json('Server error');
  }
};

const getOne = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
    if (!site) return res.status(404).json('Site not found');
    return res.json(site);
  } catch (err) {
    return res.status(500).json('Server error');
  }
};

const create = async (req, res) => {
  try {
    const site = new Site(req.body);
    const saved = await site.save();
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(500).json('Server error');
  }
};

const update = async (req, res) => {
  try {
    const site = await Site.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!site) return res.status(404).json('Site not found');
    return res.json(site);
  } catch (err) {
    return res.status(500).json('Server error');
  }
};

const remove = async (req, res) => {
  try {
    const site = await Site.findByIdAndDelete(req.params.id);
    if (!site) return res.status(404).json('Site not found');
    return res.json('Site deleted');
  } catch (err) {
    return res.status(500).json('Server error');
  }
};

const getPublic = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id).select(
      'customer siteAddress equipType vendor hostId serial bmsVersion maintExp ' +
      'gateway dnsServer lanOneIp lanOneSub lanTwoIp lanTwoSub ' +
      'platformPort platformTlsPort foxPort foxTlsPort httpPort httpsPort ' +
      'platformUser platformPass stationUser stationPass'
    );
    if (!site) return res.status(404).json('Site not found');
    return res.json(site);
  } catch (err) {
    return res.status(500).json('Server error');
  }
};

export default { getAll, getOne, create, update, remove, getPublic };
