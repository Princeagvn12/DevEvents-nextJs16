import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import Event from './event.model';

/**
 * TypeScript interface for Booking document
 * Extends Mongoose Document to include all Booking fields
 */
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Check if model already exists to prevent duplicate schema registration
let Booking: Model<IBooking>;

if (mongoose.models.Booking) {
  // Use existing model if available (prevents OverwriteModelError in development)
  Booking = mongoose.models.Booking as Model<IBooking>;
} else {
  /**
   * Booking Schema Definition
   * Defines the structure and validation rules for Booking documents
   */
  const BookingSchema = new Schema<IBooking>(
    {
      eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, 'Event ID is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        validate: {
          validator: function (email: string) {
            // RFC 5322 compliant email validation regex
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
          },
          message: 'Please provide a valid email address',
        },
      },
    },
    {
      timestamps: true, // Automatically manage createdAt and updatedAt
    }
  );

  /**
   * Pre-save hook to validate that the referenced Event exists
   * Prevents orphaned bookings by checking event existence before saving
   */
  BookingSchema.pre('save', async function () {
    // Only validate eventId if it's new or modified
    if (this.isModified('eventId')) {
      const eventExists = await Event.findById(this.eventId);
      
      if (!eventExists) {
        throw new Error(`Event with ID ${this.eventId} does not exist`);
      }
    }
  });

  // Create index on eventId for faster queries and lookups
  BookingSchema.index({ eventId: 1 });

  // Enforce unique bookings per event per email — prevents duplicate bookings
  BookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

  // Create the model
  Booking = mongoose.model<IBooking>('Booking', BookingSchema);
}

export default Booking;
