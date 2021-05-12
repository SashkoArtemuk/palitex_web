<template>
  <div>
    <div :class="type">
        <h3>Notification</h3>
        <div id="notification_message">
			<slot></slot>
		</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'BaseNotification',
    props: {
        type: {
            type: String,
            validator: (prop) => ['info', 'error'].includes(prop),
        },
    },
};
</script>
