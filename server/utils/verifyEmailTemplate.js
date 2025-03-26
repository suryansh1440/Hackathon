const verifyEmailTemplate = ({name,url}) => {
    return `
    <p>Thank you for registering with kit tutor, ${name}.</p>
    <button style="background-color: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
        <a href="${url}" style="color: white; text-decoration: none;">Verify your email</a>
    </button>
    <p>If you did not register for kit tutor, please ignore this email.</p>
    `;
}

export default verifyEmailTemplate;