import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * TypeScript interface for Event document
 * Extends Mongoose Document to include all Event fields
 */
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Check if model already exists to prevent duplicate schema registration
let Event: Model<IEvent>;

if (mongoose.models.Event) {
  // Use existing model if available (prevents OverwriteModelError in development)
  Event = mongoose.models.Event as Model<IEvent>;
} else {
  /**
   * Event Schema Definition
   * Defines the structure and validation rules for Event documents
   */
  const EventSchema = new Schema<IEvent>(
    {
      title: {
        type: String,
        required: [true, 'Event title is required'],
        trim: true,
      },
      slug: {
        type: String,
        lowercase: true,
        trim: true,
      },
      description: {
        type: String,
        required: [true, 'Event description is required'],
        trim: true,
      },
      overview: {
        type: String,
        required: [true, 'Event overview is required'],
        trim: true,
      },
      image: {
        type: String,
        required: [true, 'Event image is required'],
        trim: true,
      },
      venue: {
        type: String,
        required: [true, 'Event venue is required'],
        trim: true,
      },
      location: {
        type: String,
        required: [true, 'Event location is required'],
        trim: true,
      },
      date: {
        type: String,
        required: [true, 'Event date is required'],
      },
      time: {
        type: String,
        required: [true, 'Event time is required'],
      },
      mode: {
        type: String,
        required: [true, 'Event mode is required'],
        enum: {
          values: ['online', 'offline', 'hybrid'],
          message: 'Mode must be either online, offline, or hybrid',
        },
      },
      audience: {
        type: String,
        required: [true, 'Event audience is required'],
        trim: true,
      },
      agenda: {
        type: [String],
        required: [true, 'Event agenda is required'],
        validate: {
          validator: (v: string[]) => Array.isArray(v) && v.length > 0,
          message: 'Agenda must contain at least one item',
        },
      },
      organizer: {
        type: String,
        required: [true, 'Event organizer is required'],
        trim: true,
      },
      tags: {
        type: [String],
        required: [true, 'Event tags are required'],
        validate: {
          validator: (v: string[]) => Array.isArray(v) && v.length > 0,
          message: 'Tags must contain at least one item',
        },
      },
    },
    {
      timestamps: true, // Automatically manage createdAt and updatedAt
    }
  );

  /**
   * Pre-save hook to auto-generate slug and normalize date/time
   * Only regenerates slug if title has been modified
   */
  EventSchema.pre('save', function () {
    // Generate slug from title if title is new or modified
    if (this.isModified('title')) {
      this.slug = this.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    }

    // Normalize date to ISO format if modified
    if (this.isModified('date')) {
      const parsedDate = new Date(this.date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date format');
      }
      this.date = parsedDate.toISOString().split('T')[0]; // Store as YYYY-MM-DD
    }

    // Normalize time format (HH:MM) if modified
    if (this.isModified('time')) {
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(this.time)) {
        throw new Error('Time must be in HH:MM format (24-hour)');
      }
    }
  });

  // Create unique index on slug for faster lookups and uniqueness enforcement
  EventSchema.index({ slug: 1 }, { unique: true });

  // Create the model
  Event = mongoose.model<IEvent>('Event', EventSchema);
}

export default Event;
