import { asyncHandler } from "../utils/asyncHandler.js";
import {Note} from "../models/Note.js";
import { ApiError } from "../utils/ApiError.js";

export const getNotes = asyncHandler(async (req, res) => {
    const {lead,contact,search} = req.query;
    const filter = {owner: req.user._id};
    if(lead) filter.lead = lead;
    if(contact) filter.contact = contact;
    if(search) {
        const rx = new RegExp(search, 'i');
        filter.$or = [{title: rx}, {content: rx}];
    }
    const notes = await Note.find(filter)
    .sort({pinned: -1, createdAt: -1})
    .populate('lead', 'name company')
    .populate('contact', 'name company');
    res.json({success: true, count: notes.length, notes});
});

export const createNote = asyncHandler(async (req, res) => {
    const { content, lead, contact, pinned } = req.body;
    if(!content) throw new ApiError(400, 'Content is required');
    const note = await Note.create({content, lead: lead || null, contact: contact || null, pinned: Boolean(pinned), owner: req.user._id});
    res.status(201).json({success: true, note});
});

export const updateNote = asyncHandler(async (req, res) => {
    const {owner, ...updates} = req.body;
    const note = await Note.findOneAndUpdate({owner: req.user._id, _id: req.params.id}, updates, {new: true, runValidators: true});
    if(!note) throw new ApiError(404, 'Note not found');
    res.json({success: true, note});
});

export const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findOneAndDelete({owner: req.user._id, _id: req.params.id});
    if(!note) throw new ApiError(404, 'Note not found');
    res.json({success: true, message: 'Note deleted'});
});