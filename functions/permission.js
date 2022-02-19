module.exports.permCheck = (member, perms) => {
    if (member.permissions.has(perms)) return true;

    return false;
};
