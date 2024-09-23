from rest_framework import serializers
from .models import *


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "first_name", "last_name")


class ProfileSerializer(serializers.ModelSerializer):
    user = AuthorSerializer(read_only=True)
    
    class Meta:
        model = Profile
        fields = "__all__"


class ProfilePostSerializer(serializers.ModelSerializer):
    user = AuthorSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ("id", "user", "image")


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class CommentsSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Comments
        fields = "__all__"


class PostsSerializer(serializers.ModelSerializer):
    profile = ProfilePostSerializer(read_only=True)
    likes = LikeSerializer(read_only=True, many=True)
    comments = CommentsSerializer(read_only=True, many=True)

    class Meta:
        model = Posts
        fields = "__all__"

    def create(self, validated_data):
        return Posts.objects.create(**validated_data)


class SubscriptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriptions
        fields = "__all__"


class BookmarkPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ("id", "title", "image", "content")


class BookmarkSerializer(serializers.ModelSerializer):
    # post = BookmarkPostSerializer()

    class Meta:
        model = Bookmark
        fields = "__all__"


class MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = "__all__"


class NotificationsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notifications
        fields = "__all__"


class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = "__all__"


class WalletTransactionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionHistory
        fields = "__all__"




