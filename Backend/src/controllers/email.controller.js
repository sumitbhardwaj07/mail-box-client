import { Email } from "../models/email.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";


const sendEmail = asyncHandler(async (req, res) => {
    const { to, subject, body } = req.body;
    const userEmail = req.user.email;
    let fileUrl = null;


    if (!to || !subject || !body) {
        throw new ApiError(400, "All fields are required");
    }

    if(req.file) {
        const uploadResult = await uploadOnCloudinary(req.file.path);
        if(!uploadResult) {
            throw new ApiError(500, "Failed to upload file to cloudinary");
        }
        fileUrl = uploadResult.url;
    }

    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;

    // Create "sent" and "inbox" email entries
    const sentEmailData = {
        from: userEmail,
        to,
        subject,
        body,
        time: formattedTime,
        type: "sent",
        isRead: true, // Mark as read by default for the sender
        attachment: fileUrl,
    };

    const inboxEmailData = {
        from: userEmail,
        to,
        subject,
        body,
        time: formattedTime,
        type: "inbox",
        isRead: false, // Mark as unread by default for the recipient
        attachment: fileUrl,
    };

    // Save both "sent" and "inbox" emails simultaneously
    const [sentEmail, inboxEmail] = await Promise.all([
        Email.create(sentEmailData),
        Email.create(inboxEmailData)
    ]);

    if (!sentEmail || !inboxEmail) {
        throw new ApiError(500, "Failed to send email");
    }

    res.status(201).json(new ApiResponse(201, { sentEmail, inboxEmail }, "Email sent successfully"));
});



const getInboxEmails = asyncHandler(async (req, res) =>{
    const userEmail = req.user.email;

    const inboxEmails = await Email.find({to: userEmail, type:"inbox"}).sort({createdAt: -1});
    //console.log(inboxEmails)

    if(!inboxEmails){
        throw new ApiError(404, "No email found in your inbox");
    }

    res.status(200).json(new ApiResponse(200, inboxEmails, "Inbox emails fetched successfully"))
})


const getSentEmails = asyncHandler(async (req, res) => {
    const userEmail = req.user.email;
    //console.log(userEmail);

    const sentEmails = await Email.find({from: userEmail, type: "sent"}).sort({createdAt: -1});

    if(!sentEmails){
        throw new ApiError(404, "No sent emails found");
    }

    res.status(200).json(new ApiResponse(200, sentEmails, "Sent emails fetched successfully"))
});



const deleteEmail = asyncHandler(async (req,res) =>{
    const {id} = req.params;


    const result = await Email.findByIdAndDelete(id);

    if(!result){
        throw new ApiError(404, "email not found");
    }


    res.status(200).json(new ApiResponse(200,{}, "email deleted successfully"))
})


const updateStatus = asyncHandler(async (req,res) => {
    const { id } = req.params;
    //console.log(id)
    
    const {isRead} = req.body;

    const email = await Email.findByIdAndUpdate(
        {_id: id },
        { isRead : isRead },
        {new :true}
    );

    if(!email){
        throw new ApiError(404, "email not found");
    }

    res.status(200).json(new ApiResponse(200,email, "email updated successfully"))
})

export { sendEmail, getInboxEmails, getSentEmails, deleteEmail, updateStatus};