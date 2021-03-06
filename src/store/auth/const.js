export const AUTH_ACTION_TYPES = {
    UNLOCK_SUCCESS: 'UNLOCK_SUCCESS',
    UNLOCK_FAIL: 'UNLOCK_FAIL',
    SET_PASSCODE_SUCCESS: 'SET_PASSCODE_SUCCESS',
    SET_PASSCODE_FAIL: 'SET_PASSCODE_FAIL',
    CHECK_REGISTERED: 'CHECK_REGISTERED',
    LOCK_WALLET: 'LOCK_WALLET'
}

export const AUTH_STATUS = {
    NOT_REGISTERED: 'NOT_REGISTERED',
    NOT_AUTH: 'NOT_AUTH',
    IS_AUTH: 'IS_AUTH',
    IS_LOCKED: 'IS_LOCKED',
    CHECKING_REGISTERED: 'CHECKING_REGISTERED'
}