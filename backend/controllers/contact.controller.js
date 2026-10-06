import {Contact} from '../models/Contact.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';

export const getContacts = asyncHandler(async (req, res) => {
  const {search,tag} = req.query;
  const filter = {owner: req.user._id};

  if(tag) filter.tags = tag;
  if(search) {
    const rx = new RegExp(search, 'i');
    filter.$or = [{name: rx}, {email: rx}, {phone: rx}];
  }
  const contacts = await Contact.find(filter).sort({favorite: -1});
  res.json({success: true,count: contacts.length ,contacts});
});

export const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findOne({owner: req.user._id, _id: req.params.id});
  if(!contact) throw new ApiError(404, 'Contact not found');
  res.json({success: true, contact});
});

export const createContact = asyncHandler(async (req, res) => {
  const contact = await Contact.create({...req.body, owner: req.user._id});
  res.status(201).json({success: true, contact});
});

export const updateContact = asyncHandler(async (req, res) => {
    const {owner, ...updates} = req.body;
    const contact = await Contact.findOneAndUpdate({owner: req.user._id, _id: req.params.id}, updates, {new: true, runValidators: true});
    if(!contact) throw new ApiError(404, 'Contact not found');
    res.json({success: true, contact});
});

export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findOneAndDelete({owner: req.user._id, _id: req.params.id});
  if(!contact) throw new ApiError(404, 'Contact not found');
  res.json({success: true, message: 'Contact deleted'});
});