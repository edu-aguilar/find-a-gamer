<template>
  <div class="event-detail">
    <div class="owner-panel" v-if="isUserOwner">
      <button>
        <router-link
          :to="{ name: 'eventEdit', params: { eventId: event.eventId } }"
          >Edit</router-link
        >
      </button>
      <button @click="removeEvent">Delete</button>
    </div>
    <div v-if="!event">
      <p>Fetching event detail...</p>
    </div>
    <div v-else class="event">
      <h1>Event Detail</h1>
      <p>{{ event.title }}</p>
      <p>{{ event.description }}</p>
      <p>Created by: {{ event.ownerId }}</p>
      <p>Starts at: {{ event.startTime }}</p>
      <p>Ends at: {{ event.endTime }}</p>
      <img :src="event.image" class="event__image" alt="" />
      <div class="event__comments">
        <h2>Match comments:</h2>
        <p v-if="!event.comments.length">
          There is no comments yet. Come on!! be the first one to add a comment!
        </p>
        <ul class="event__comments__comment">
          <li v-for="(comment, index) in event.comments" :key="index">
            <span>User {{ comment.userId }} said: </span>
            <span>{{ comment.message }}</span>
          </li>
        </ul>
        <h2>Add a new comment!</h2>
        <div class="event__comments__add-comment" v-if="$auth.isAuthenticated">
          <label for="newComment"></label>
          <textarea
            name="newComment"
            id="newComment"
            cols="50"
            rows="6"
            v-model="newMessage"
          ></textarea>
          <button :disabled="!newMessage" @click="addComment">
            Add comment
          </button>
        </div>
        <div v-else>
          <p>Log in to add a comment to this party!!!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getEventById, addMessageToEvent, deleteEvent } from "@/http/events";
import { getUserIdFromJWT } from "@/utils/token";

export default {
  name: "EventDetail",
  data() {
    return {
      event: null,
      newMessage: null,
      isUserOwner: null
    };
  },
  async mounted() {
    const { eventId } = this.$router.currentRoute.params;
    const result = await getEventById(eventId);
    this.event = result.data.item;
    this.isUserOwner = await this.checkUserIsOwner();
  },
  methods: {
    async addComment() {
      try {
        const createdMessage = await addMessageToEvent(
          this.event.eventId,
          this.newMessage
        );
        this.event.comments.push(createdMessage.data.item);
        this.newMessage = null;
      } catch (error) {
        alert("error posting comment!");
      }
    },
    async checkUserIsOwner() {
      const jwt = await this.$auth.getJwt();
      return this.event && this.event.ownerId === getUserIdFromJWT(jwt);
    },
    async removeEvent() {
      try {
        await deleteEvent(this.event.eventId)
        alert('Event removed successfully');
      } catch (error) {
        alert('Error removing event')
      }
    }
  }
};
</script>
