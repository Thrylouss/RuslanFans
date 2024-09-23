from django.db.models import Q
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView, \
    ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response

from RuslanFansApp.models import *
from RuslanFansApp.pagination import CustomPagination
from RuslanFansApp.permissions import IsOwnerOrReadOnly
from RuslanFansApp.serializers import *


# Create your views here.
class PostsApiView(viewsets.ModelViewSet):
    queryset = Posts.objects.all().order_by("-created_at")
    serializer_class = PostsSerializer

    def perform_create(self, serializer):
        serializer.save(profile=self.request.user.profile)

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        post = self.get_object()
        user = request.user

        if post.likes.filter(id=user.id).exists():
            post.likes.remove(user)
            return Response({"status": "unliked"}, status=200)
        else:
            post.likes.add(user)
            return Response({"status": "liked"}, status=200)


class ProfileApiView(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    pagination_class = CustomPagination
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        queryset = Profile.objects.all().order_by('-created_at')
        search = self.request.query_params.get('search', None)
        if search is not None:
            queryset = queryset.filter(user__username__icontains=search)
        return queryset


class CommentsApiView(viewsets.ModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer


class BookmarkApiView(viewsets.ModelViewSet):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer


class NotificationsApiView(viewsets.ModelViewSet):
    queryset = Notifications.objects.all()
    serializer_class = NotificationsSerializer


class WalletApiView(viewsets.ModelViewSet):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer


class TransactionsApiView(viewsets.ModelViewSet):
    queryset = TransactionHistory.objects.all()
    serializer_class = WalletTransactionsSerializer


class SubscriptionsApiView(viewsets.ModelViewSet):
    queryset = Subscriptions.objects.all()
    serializer_class = SubscriptionsSerializer


# class PostsApiView(ListAPIView):
#     queryset = Posts.objects.all()
#     serializer_class = PostsSerializer
#
#
# class PostsCreateApiView(CreateAPIView):
#     queryset = Posts.objects.all()
#     serializer_class = PostsSerializer
#
#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)
#
#
# class PostsRetrieveApiView(RetrieveAPIView):
#     queryset = Posts.objects.all()
#     serializer_class = PostsSerializer
#
#
# class PostsUpdateApiView(UpdateAPIView):
#     queryset = Posts.objects.all()
#     serializer_class = PostsSerializer
#
#
# class PostsDestroyApiView(DestroyAPIView):
#     queryset = Posts.objects.all()
#     serializer_class = PostsSerializer
#
#
# class ProfileApiView(ListCreateAPIView):
#     queryset = Profile.objects.all()
#     serializer_class = PostsSerializer
#
#
# class ProfileUpdateApiView(RetrieveUpdateDestroyAPIView):
#     queryset = Profile.objects.all()
#     serializer_class = PostsSerializer
#
#
# class CommentsApiView(ListCreateAPIView):
#     queryset = Comments.objects.all()
#     serializer_class = PostsSerializer
#
#
# class CommentsUpdateApiView(RetrieveUpdateDestroyAPIView):
#     queryset = Comments.objects.all()
#     serializer_class = PostsSerializer
#
#
# class BookmarkApiView(ListCreateAPIView):
#     queryset = Bookmark.objects.all()
#     serializer_class = PostsSerializer
#
#
# class BookmarkUpdateApiView(RetrieveUpdateDestroyAPIView):
#     queryset = Bookmark.objects.all()
#     serializer_class = PostsSerializer
#
#
# class NotificationsApiView(ListCreateAPIView):
#     queryset = Notifications.objects.all()
#     serializer_class = PostsSerializer
#
#
# class NotificationsUpdateApiView(RetrieveUpdateDestroyAPIView):
#     queryset = Notifications.objects.all()
#     serializer_class = PostsSerializer
#
#
# class MessagesApiView(ListCreateAPIView):
#     queryset = Messages.objects.all()
#     serializer_class = PostsSerializer
#
#
# class MessagesUpdateApiView(RetrieveUpdateDestroyAPIView):
#     queryset = Messages.objects.all()
#     serializer_class = PostsSerializer
#
#
# class WalletApiView(ListCreateAPIView):
#     queryset = Wallet.objects.all()
#     serializer_class = PostsSerializer
#
#
# class WalletUpdateApiView(RetrieveUpdateDestroyAPIView):
#     queryset = Wallet.objects.all()
#     serializer_class = PostsSerializer


