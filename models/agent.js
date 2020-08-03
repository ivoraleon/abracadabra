const mongoose = require('mongoose');
const House = require('./house');

const agentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    }
);

agentSchema.pre('remove',
    function (next) {
        House.find({ agent: this.id }, (err, houses) => {
            if (err) {
                next(err)
            } else if (houses.length > 0) {
                next(new Error('This agent has houses that are still listed for sale.'))
            } else {
                next()
            }
        })
    }
);

module.exports = mongoose.model('Agent', agentSchema);