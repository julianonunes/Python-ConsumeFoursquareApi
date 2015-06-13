# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Venue',
            fields=[
                ('id', models.CharField(max_length=40, serialize=False, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('address', models.CharField(max_length=200)),
                ('rating', models.IntegerField()),
                ('price', models.IntegerField()),
                ('distance', models.DecimalField(max_digits=10, decimal_places=2)),
            ],
        ),
    ]
