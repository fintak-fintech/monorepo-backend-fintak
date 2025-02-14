const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const VERIFY_USER_STATUS = {
    NO_VERIFY: 'no_verify',
    PENDING: 'pending',
    VERIFY: 'verify',
    REJECTED: 'rejected',
}

module.exports = {
    CLIENT_ID,
    CLIENT_SECRET,
    VERIFY_USER_STATUS
}